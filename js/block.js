class Block{
  /**
  * has:
  * @variable {x, y} position - coords of block
  * @variable {int} value - value of block
  * @variable {string} id - id of block in HTML
  *
  * @usage -  use new Block({x, y}, value)  for create a new Block on a board
  *
  */
  constructor(id, position = {}, value = 2){
    /**
    * @param {[x,y]} position !REQUIRED - coords of block
    * @param {int} value !REQUIRED - new value of block
    */
    this.id = `block-${id}`;
    this.position = position;
    this.value = value;
    
    display.block.spawn(this.id, this.position, this.value);
  }
  animDestroy(){
      display.block.destroy(this.id);
  }
}
