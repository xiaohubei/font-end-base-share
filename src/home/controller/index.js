'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';

let renderData = {
    js_list:[],
    css_list:[],
    h5_list:[]
};
let path_base = {
    js:"/static/pages/js/",
    css:"/static/pages/css/",
    h5:"/static/pages/h5/"
}
let getDir = function (url){
    var arr = url.split('.');
    var len = arr.length;
    return arr[len-1];
}
let getFileName =  function (file_path){
  return new Promise(function( resolve, reject){
    fs.readdir(file_path, function (err, files){
        if(err){
            console.log("getFileName:error " + err);
            return;
        }
        var count = files.length;
        if(count > 0) renderData.js_list = [];
        files.forEach( function (filename, index){

            fs.stat(path.join(file_path, filename), function(err, stats){
                if(err) throw err;
                if(stats.isFile()){
                    if(getDir(filename) == 'html'){
                        renderData.js_list.push({
                            name:filename,
                            href:path.join(path_base.js, filename)
                        })
                    }
                }else if(stats.isDirectory()){
                  debugger;
                    console.log('stats.isDirectory');
                }
                if(index == files.length -1)resolve({result:1});
            })
        })
    });
  })
}

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    // async 和await的使用
    //auto render template file index_index.html
    /*var renderData = {
      'js_list':
        [
          {
            name:"数据类型",
            href:"/static/pages/js/1.var_type.html"
          },
          {
            name:"数据类型",
            href:"/static/pages/js/1.var_type.html"
          },
        ],
      'css_list':
        [
          {
            name:"定位",
            href:"/static/pages/js/1.var_type.html"
          },
          {
            name:"动画",
            href:"/static/pages/js/1.var_type.html"
          },
        ],
      'h5_list':
        [
          {
            name:"基础api",
            href:"/static/pages/js/1.var_type.html"
          },
          {
            name:"canvas",
            href:"/static/pages/js/1.var_type.html"
          },
        ]
    }*/

    // let content = await this.fetch();
    let page_path = `${think.ROOT_PATH}/${think.config("static_page_path")}`;
    let page_js_path = page_path+ "/js/";
    let page_css_path = page_path+ "/css/";
    let page_h5_path = page_path+ "/h5/";

    let re = await getFileName(page_js_path);
    debugger;
    console.log("re: " + re);
    //renderData.css_list = await getFileName("page_css_path");
    //renderData.h5_list = await getFileName("page_h5_path");
    debugger;
    this.assign(renderData);

    // console.log("think.ROOT_PATH:" + think.ROOT_PATH);
    // console.log("think.config:" + think.config('static_page_path'));
    // console.log("page_js_path:" + page_js_path);
    // console.log("page_css_path:" + page_css_path);
    // console.log("page_h5_path:" + page_h5_path);

    return this.display();
  }
  /**
   * js action
   * @return {Promise} []
   */
  varTypeAction(){
    //auto render template file index_js.html
    return this.display();
  }
}