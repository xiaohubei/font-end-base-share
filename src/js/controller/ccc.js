'use strict';


export default class extends think.controller.base{
  /**
   * index action
   * @return {Promise} []
   */
  asfaAction(){
    //auto render template file index_index.html
    return this.display();
  }
 
}