use js_sys::Math;
use std::fmt;
use wasm_bindgen::prelude::*;
mod utils;

//定义打印宏
macro_rules! log {
    ( $($t:tt)*) => {
        web_sys::console::log_1(&format!( $($t)*).into());
    };
}

#[wasm_bindgen]
#[repr(u8)] //指定内存大小，占用8个bit
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Universe {
    //获取到行号列好对应的索引
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    //获取活着的领据的个数
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0u8;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_col == 0 && delta_row == 0 {
                    //是自己时直接跳过
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let neighbor_index = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[neighbor_index] as u8;
            }
        }
        count
    }

    //下一个时间点宇宙的状态
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();
        for row in 0..self.height {
            for col in 0..self.width {
                let index = self.get_index(row, col);
                let cell = self.cells[index];
                let live_neighbors = self.live_neighbor_count(row, col);

                //打印一下状态
                /* log!(
                    "cell[{}, {}] is initially {:?} and has {} live neighbors",
                    row,
                    col,
                    cell,
                    live_neighbors
                ); */

                let next_cell = match (cell, live_neighbors) {
                    //任何邻近细胞少于两个的活细胞都会死亡，似乎是由于细胞数量不足造成的
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    //任何有两个或三个邻居的活细胞都能活到下一代
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    //任何有三个以上邻居的活细胞都会死亡，就好像是由于细胞数量过多
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    //任何死亡细胞，如果恰好有三个活的邻居，就会变成活细胞，就像通过繁殖一样
                    (Cell::Dead, 3) => Cell::Alive,
                    (otherwise, _) => otherwise,
                };
                //改变后的状态
                /* log!("    it becomes {:?}", next_cell); */
                next[index] = next_cell;
            }
        }

        self.cells = next;
    }

    //创造一个新的宇宙
    pub fn new(row: Option<u32>, col: Option<u32>) -> Self {
        //添加钩子函数调试代码
        utils::set_panic_hook();
        let w = match row {
            Some(w) => w,
            None => 64,
        };
        let h = match col {
            Some(h) => h,
            None => 64,
        };
        //随机初始化宇宙存活的细胞
        let cells: Vec<Cell> = (0..w * h)
            .map(|_| {
                //调用js的随机生成函数
                if Math::random() < 0.5 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();
        Self {
            width: w,
            height: h,
            cells,
        }
    }

    //渲染出来
    pub fn render(&self) -> String {
        self.to_string()
    }

    //获取当前宇宙宽度
    pub fn width(&self) -> u32 {
        self.width
    }
    //获取当前宇宙高度
    pub fn height(&self) -> u32 {
        self.height
    }

    //获取当前细胞指针
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
}

//为Universe实现Display trait
//这样才能调用to_string方法
impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?
            }
            write!(f, "\n")?
        }
        Ok(())
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_| Cell::Dead).collect();
    }

    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..height * self.width).map(|_| Cell::Dead).collect();
    }
}

impl Universe {
    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for &(row, col) in cells.iter().clone() {
            let idx = self.get_index(row, col);
            self.cells[idx] = Cell::Alive;
        }
    }
}

//为细胞添加切换状态功能
impl Cell {
    pub fn toggle(&mut self) {
        *self = match *self {
            Self::Alive => Self::Dead,
            Self::Dead => Self::Alive,
        };
    }
}

//实现宇宙中切换对应行列细胞状态
#[wasm_bindgen]
impl Universe {
    pub fn toggle_cell(&mut self, row: u32, col: u32) {
        let idx = self.get_index(row, col);
        self.cells[idx].toggle();
    }
}
