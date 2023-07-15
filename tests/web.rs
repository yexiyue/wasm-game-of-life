#![cfg(target_arch="wasm32")]
use wasm_bindgen_test::*;
use wasm_game_of_life::Universe;

wasm_bindgen_test_configure!(run_in_browser);

//初始化的宇宙
#[cfg(test)]
pub fn input_spaceship() -> Universe {
    let mut universe = Universe::new(None,None);
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(1,2), (2,3), (3,1), (3,2), (3,3)]);
    universe
}

//调用下一个tick后的宇宙
#[cfg(test)]
pub fn expected_spaceship() -> Universe {
    let mut universe = Universe::new(None,None);
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(2,1), (2,3), (3,2), (3,3), (4,2)]);   
    universe
}
//测试下一个宇宙
#[wasm_bindgen_test]
pub fn test_tick() {
    let mut input_universe = input_spaceship();
    let expected_universe = expected_spaceship();
    input_universe.tick();

    assert_eq!(&input_universe.get_cells(),&expected_universe.get_cells());
}


