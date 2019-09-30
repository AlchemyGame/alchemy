(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Elements"],{"3f27":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return c})),a.d(t,"d",(function(){return m})),a.d(t,"a",(function(){return g}));var r=a("bc3a"),l=a.n(r);function n(e,t,a,r,l,n,s){try{var i=e[n](s),o=i.value}catch(c){return void a(c)}i.done?t(o):Promise.resolve(o).then(r,l)}function s(e){return function(){var t=this,a=arguments;return new Promise((function(r,l){var s=e.apply(t,a);function i(e){n(s,r,l,i,o,"next",e)}function o(e){n(s,r,l,i,o,"throw",e)}i(void 0)}))}}function i(){return o.apply(this,arguments)}function o(){return o=s((function*(){try{const e=yield l.a.get("/api/elements");return e}catch(e){return e.response}})),o.apply(this,arguments)}function c(e,t){return d.apply(this,arguments)}function d(){return d=s((function*(e,t){try{const a=yield l()({method:"post",url:"/api/element/add",data:{name:e,category:t}});return a}catch(a){return a.response}})),d.apply(this,arguments)}function m(e,t,a,r){return u.apply(this,arguments)}function u(){return u=s((function*(e,t,a,r){try{const n=yield l()({method:"put",url:"/api/element/update",data:{elementId:e,name:t,description:a,category:r}});return n}catch(n){return n.response}})),u.apply(this,arguments)}function g(e){return b.apply(this,arguments)}function b(){return b=s((function*(e){try{const t=yield l()({method:"delete",url:"/api/element/delete",data:{elementId:e}});return t}catch(t){return t.response}})),b.apply(this,arguments)}},4198:function(e,t,a){},ae8c:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section-elements"},[a("b-container",[a("Table",{attrs:{data:e.elements,fields:e.fields,totalRows:e.totalRows,loading:e.loading.elements,error:e.errors.elements,target:"element"},on:{commonButtonClick:function(t){e.modals.create=!0},editButtonClick:e.beforeEditElement,deleteButtonClick:e.beforeDeleteElement}},[e._t("default",[a("b-btn",{staticClass:"mb-3",attrs:{variant:"success"},on:{click:e.beforeCreateCategory}},[e._v("\n          Create category\n        ")])],{type:"button"})],2),a("b-modal",{attrs:{title:"Create new element",size:"xl","hide-header-close":"hide-header-close","ok-title":"Create","ok-variant":"success","ok-disabled":e.loading.createElement,"cancel-disabled":e.loading.createElement,"cancel-variant":"danger"},on:{ok:e.createElement,hidden:e.afterCreateElement},model:{value:e.modals.create,callback:function(t){e.$set(e.modals,"create",t)},expression:"modals.create"}},[a("b-row",[a("b-col",{attrs:{cols:"12",sm:"12",md:"12",lg:"4",xl:"4"}},[a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("b-form-group",{attrs:{"label-cols":3,label:"Name:","label-for":"createElementName"}},[a("b-form-input",{attrs:{id:"createElementName",type:"text",required:"required",trim:"trim",placeholder:"Fire",state:e.validateName(e.create.name,e.elements)},model:{value:e.create.name,callback:function(t){e.$set(e.create,"name",t)},expression:"create.name"}})],1)],1)],1),a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("b-form-group",{attrs:{"label-cols":3,label:"Category:","label-for":"createElementCategory"}},[e.newCategory.active?e._e():a("b-form-select",{attrs:{id:"createElementCategory",type:"text",required:"required",state:e.validateNull(e.create.categoryId)},model:{value:e.create.categoryId,callback:function(t){e.$set(e.create,"categoryId",t)},expression:"create.categoryId"}},e._l(e.categories,(function(t){return a("option",{key:t._id,domProps:{value:t._id}},[e._v("\n                    "+e._s(t.name)+"\n                  ")])})),0),e.newCategory.active?a("b-form-input",{attrs:{id:"createElementCategory",type:"text",required:"required",trim:"trim",placeholder:"Elements",state:e.validateName(e.newCategory.name,e.categories)},model:{value:e.newCategory.name,callback:function(t){e.$set(e.newCategory,"name",t)},expression:"newCategory.name"}}):e._e()],1)],1)],1),!1===e.newCategory.active?a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("b-btn",{staticClass:"float-right",attrs:{variant:"light",size:"sm"},on:{click:function(t){e.newCategory.active=!0,e.create.categoryId=null}}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),e._v("New category\n              ")],1)],1)],1):e._e(),!0===e.newCategory.active?a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("b-btn",{staticClass:"float-right",attrs:{variant:"light",size:"sm"},on:{click:function(t){e.newCategory.active=!1,e.newCategory.name=null}}},[a("font-awesome-icon",{attrs:{icon:"clipboard"}}),e._v("Choose category\n              ")],1)],1)],1):e._e()],1),a("b-col",{staticClass:"mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0",attrs:{cols:"12",sm:"12",md:"12",lg:"8",xl:"8"}},[a("b-card",{attrs:{"no-body":"no-body"}},[a("b-tabs",{attrs:{card:"card",pills:"pills",vertical:"vertical",small:"small","nav-wrapper-class":"w-30"}},e._l(e.categories,(function(t){return a("b-tab",{key:t._id,attrs:{title:t.name}},e._l(e.elements,(function(r){return r.category===t.name?a("b-btn",{key:r._id,staticClass:"mr-2 mb-2",attrs:{size:"sm",variant:"outline-success"},on:{click:function(t){e.create.name=r.name}}},[e._v("\n                  "+e._s(r.name)+"\n                ")]):e._e()})),1)})),1)],1)],1),e.errors.createElement?a("b-col",{attrs:{cols:"12"}},[a("b-alert",{attrs:{show:"show",variant:"danger"}},[e._v("\n            "+e._s(e.errors.createElement)+"\n          ")])],1):e._e()],1)],1),a("b-modal",{attrs:{title:"Edit element",size:"xl","hide-header-close":"hide-header-close","ok-title":"Save","ok-variant":"success","ok-disabled":e.loading.editElement,"cancel-disabled":e.loading.editElement,"cancel-variant":"danger"},on:{ok:e.editElement,hidden:e.afterEditElement},model:{value:e.modals.edit,callback:function(t){e.$set(e.modals,"edit",t)},expression:"modals.edit"}},[a("b-row",[a("b-col",{attrs:{cols:"12",sm:"12",md:"12",lg:"4",xl:"4"}},[a("b-form-group",{attrs:{"label-cols":3,label:"Name:","label-for":"editElementName"}},[a("b-form-input",{attrs:{id:"editElementName",type:"text",required:"required",trim:"trim"},model:{value:e.edit.name,callback:function(t){e.$set(e.edit,"name",t)},expression:"edit.name"}})],1),a("b-form-group",{attrs:{"label-cols":3,label:"Category:","label-for":"editCategory"}},[a("b-form-select",{attrs:{id:"editCategory",type:"text",required:"required"},model:{value:e.edit.categoryId,callback:function(t){e.$set(e.edit,"categoryId",t)},expression:"edit.categoryId"}},e._l(e.categories,(function(t){return a("option",{key:t._id,domProps:{value:t._id}},[e._v("\n                "+e._s(t.name)+"\n              ")])})),0)],1),a("b-form-group",{attrs:{"label-cols":3,label:"Description:","label-for":"editDescription"}},[a("b-form-textarea",{attrs:{id:"editDescription",placeholder:"Description",rows:"3",required:"required",trim:"trim","no-resize":"no-resize"},model:{value:e.edit.description,callback:function(t){e.$set(e.edit,"description",t)},expression:"edit.description"}})],1)],1),a("b-col",{attrs:{cols:"12",sm:"12",md:"12",lg:"8",xl:"8"}},[a("b-card",{attrs:{"no-body":"no-body"}},[a("b-tabs",{attrs:{card:"card",pills:"pills",vertical:"vertical",small:"small","nav-wrapper-class":"w-30"}},e._l(e.categories,(function(t){return a("b-tab",{key:t._id,attrs:{title:t.name}},e._l(e.elements,(function(r){return r.category===t.name?a("b-btn",{key:r._id,staticClass:"mr-2 mb-2",attrs:{size:"sm",variant:"outline-success"},on:{click:function(t){e.edit.name=r.name}}},[e._v("\n                  "+e._s(r.name)+"\n                ")]):e._e()})),1)})),1)],1)],1)],1)],1),a("b-modal",{attrs:{size:"md","hide-header-close":"hide-header-close","ok-title":"Delete","ok-variant":"success","ok-disabled":e.loading.deleteElement,"cancel-disabled":e.loading.deleteElement,"cancel-variant":"danger","hide-header":"hide-header"},on:{ok:e.deleteElement,hidden:e.afterDeleteElement},model:{value:e.modals.delete,callback:function(t){e.$set(e.modals,"delete",t)},expression:"modals.delete"}},[a("b-row",{staticClass:"text-center"},[e.errors.deleteElement?e._e():a("b-col",{attrs:{cols:"12"}},[a("h4",[e._v("\n            Delete element\n            "),a("strong",{staticClass:"text-danger"},[e._v("\n              "+e._s(this.delete.name)+"\n            ")]),e._v("\n            ?\n          ")])]),e.errors.deleteElement?a("b-col",{attrs:{cols:"12"}},[a("b-alert",{attrs:{show:"show",variant:"danger"}},[e._v("\n            "+e._s(e.errors.deleteElement)+"\n          ")])],1):e._e()],1)],1),a("b-modal",{attrs:{title:"Create new category",size:"xl","hide-header-close":"hide-header-close","ok-title":"Create","ok-variant":"success","ok-disabled":e.loading.createCategory,"cancel-disabled":e.loading.createCategory,"cancel-variant":"danger"},on:{ok:e.createCategory,hidden:e.afterCreateCategory},model:{value:e.modals.createCategory,callback:function(t){e.$set(e.modals,"createCategory",t)},expression:"modals.createCategory"}},[a("b-row",[a("b-col",{attrs:{cols:"12",sm:"12",md:"12",lg:"4",xl:"4"}},[a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("b-form-group",{attrs:{"label-cols":3,label:"Name:","label-for":"createCategoryName"}},[a("b-form-input",{attrs:{id:"createCategoryName",type:"text",required:"required",trim:"trim",placeholder:"Elements",state:e.validateName(e.createCategoryData.name,e.categories)},model:{value:e.createCategoryData.name,callback:function(t){e.$set(e.createCategoryData,"name",t)},expression:"createCategoryData.name"}})],1)],1)],1)],1),a("b-col",{staticClass:"mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0",attrs:{cols:"12",sm:"12",md:"12",lg:"8",xl:"8"}},[a("b-card",{attrs:{"no-body":"no-body"}},[a("b-tabs",{attrs:{card:"card",pills:"pills",vertical:"vertical",small:"small","nav-wrapper-class":"w-30"}},e._l(e.categories,(function(t){return a("b-tab",{key:t._id,attrs:{title:t.name}},e._l(e.elements,(function(r){return r.category===t.name?a("b-btn",{key:r._id,staticClass:"mr-2 mb-2",attrs:{size:"sm",variant:"outline-success"},on:{click:function(t){e.create.name=r.name}}},[e._v("\n                  "+e._s(r.name)+"\n                ")]):e._e()})),1)})),1)],1)],1),e.errors.createCategory?a("b-col",{attrs:{cols:"12"}},[a("b-alert",{attrs:{show:"show",variant:"danger"}},[e._v("\n            "+e._s(e.errors.createCategory)+"\n          ")])],1):e._e()],1)],1)],1)],1)},l=[],n=a("3f27"),s=a("63c6"),i=a("e46a"),o={components:{Table:i["a"]},created(){this.getElements(),this.getCategories()},watch:{$route:"getElements"},data(){return{elements:[],categories:[],totalRows:0,fields:[{key:"category",class:"align-middle text-center",sortable:!0},{key:"name",class:"align-middle text-center",sortable:!0},{key:"recipe",label:"Recipe",class:"align-middle text-center",sortable:!1},{key:"description",label:"Description",class:"align-middle text-center",sortable:!1},{key:"action",label:"Action",class:"align-middle text-center",sortable:!1}],loading:{elements:!1,categories:!1,createElement:!1,editElement:!1,deleteElement:!1,createCategory:!1},errors:{elements:null,categories:null,createElement:null,editElement:null,deleteElement:null,createCategory:null},modals:{create:!1,edit:!1,delete:!1,createCategory:!1},create:{name:null,categoryId:null},delete:{_id:null,name:null},edit:{_id:null,name:null,description:null,categoryId:null},createCategoryData:{name:""},newCategory:{active:!1,name:null}}},methods:{getElements(){this.errors.elements=null,this.loading.elements=!0,Object(n["b"])().then(e=>{this.loading.elements=!1,200===e.status?(this.elements=e.data.response,this.totalRows=e.data.response.length):this.data.table.error=e.data})},getCategories(){this.errors.categories=null,this.loading.categories=!0,Object(s["a"])().then(e=>{this.loading.categories=!1,200===e.status?this.categories=e.data.response:this.errors.categories=e.data})},beforeCreateElement(){this.modals.create=!0},createElement(e){e&&e.preventDefault(),!1!==this.validateName(this.create.name,this.elements)&&(this.loading.createElement=!0,this.newCategory.name?Object(s["b"])(this.newCategory.name).then(e=>{this.loading.createElement=!1,201===e.status?(this.create.categoryId=e.data.response._id,this.newCategory.name=null,this.createElement()):this.errors.createElement=e.data}):Object(n["c"])(this.create.name,this.create.categoryId).then(e=>{this.loading.createElement=!1,201===e.status?(this.modals.create=!1,this.getElements(),this.getCategories()):this.errors.createElement=e.data}))},afterCreateElement(){this.modals.create=!1,this.create.name=null,this.create.categoryId=null},beforeEditElement(e){this.modals.edit=!0,this.edit._id=e.item._id,this.edit.name=e.item.name,this.edit.description=e.item.description;for(let t=0;t<this.categories.length;t++)e.item.category===this.categories[t].name&&(this.edit.categoryId=this.categories[t]._id)},editElement(e){e.preventDefault(),this.loading.editElement=!0,Object(n["d"])(this.edit._id,this.edit.name,this.edit.description,this.edit.categoryId).then(e=>{this.loading.editElement=!1,200===e.status?(this.modals.edit=null,this.getElements()):this.errors.editElement=e.data})},afterEditElement(){this.modals.edit=!1,this.edit._id=null,this.edit.name=null,this.edit.description=null,this.edit.categoryId=null},beforeDeleteElement(e){this.modals.delete=!0,this.delete._id=e.item._id,this.delete.name=e.item.name},deleteElement(e){e.preventDefault(),this.loading.deleteElement=!0,Object(n["a"])(this.delete._id).then(e=>{this.loading.deleteElement=!1,200===e.status?(this.modals.delete=!1,this.getElements()):this.errors.deleteElement=e.data})},afterDeleteElement(){this.modals.delete=!1,this.errors.deleteElement=null,this.delete._id=null,this.delete.name=null},beforeCreateCategory(){this.modals.createCategory=!0},createCategory(){this.loading.createCategory=!0,Object(s["b"])(this.createCategoryData.name).then(e=>{this.loading.createCategory=!1,201===e.status?this.getCategories():this.errors.createCategory=e.data})},afterCreateCategory(){this.modals.createCategory=!1,this.createCategoryData.name="",this.errors.createCategory=""},validateName(e,t){if(!e||!t)return null;for(let a in t)if(e===t[a].name||e===t[a].name.toLowerCase())return!1;return!0},validateNull(e){return!!e}}},c=o,d=(a("dbc0"),a("2877")),m=Object(d["a"])(c,r,l,!1,null,"573def07",null);t["default"]=m.exports},dbc0:function(e,t,a){"use strict";var r=a("4198"),l=a.n(r);l.a},e46a:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"data-table"},[a("b-row",{staticClass:"mb-3"},[a("b-col",{staticClass:"pr-0",attrs:{cols:"6",sm:"6",md:"4",lg:"4",xl:"4"}},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:"Search"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("b-input-group-append",[a("b-btn",{attrs:{disabled:!e.search},on:{click:function(t){e.search=""}}},[e._v("\n            Clear\n          ")])],1)],1)],1),a("b-col",{staticClass:"pr-xl-0 pr-lg-0 pr-md-0 mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 text-right text-sm-right text-md-left text-lg-left text-xl-left",attrs:{cols:"12",sm:"12",md:"6",lg:"6",xl:"6",order:"2","order-sm":"2","order-md":"1","order-lg":"1","order-xl":"1"}},[e.commonButton?a("b-btn",{staticClass:"mb-3 mr-2",attrs:{variant:"success"},on:{click:e.commonButtonClick}},[e._v("\n        Create "+e._s(e.target)+"\n      ")]):e._e(),e._t("default",null,{type:"button"})],2),a("b-col",{attrs:{cols:"4",sm:"4",md:"2",lg:"2",xl:"2",order:"1","order-sm":"1","order-md":"2","order-lg":"2","order-xl":"2",offset:"2","offset-sm":"2","offset-md":"0","offset-lg":"0","offset-xl":"0"}},[a("b-form-select",{attrs:{options:e.pagination.pageOptions},model:{value:e.pagination.perPage,callback:function(t){e.$set(e.pagination,"perPage",t)},expression:"pagination.perPage"}})],1)],1),a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("div",{staticClass:"text-center"},[e.loading?a("b-spinner",{staticStyle:{width:"3rem",height:"3rem"},attrs:{variant:"success"}}):e._e()],1),e.error?a("b-alert",{staticClass:"text-center",attrs:{show:"show",variant:"danger"}},[e._v("\n        "+e._s(e.error)+"\n      ")]):e._e(),e.loading||e.error?e._e():a("b-table",{attrs:{"show-empty":"show-empty",responsive:"responsive",hover:"hover",flex:"flex",items:e.data,fields:e.fields,"current-page":e.pagination.currentPage,"per-page":e.pagination.perPage,filter:e.search},scopedSlots:e._u([{key:"cell(action)",fn:function(t){return[a("b-button-group",{attrs:{size:"sm"}},[e.editButton?a("b-btn",{attrs:{variant:"warning",size:"sm"},on:{click:function(a){return e.editButtonClick(t)}}},[a("font-awesome-icon",{attrs:{icon:"edit"}})],1):e._e(),e.deleteButton?a("b-btn",{attrs:{variant:"danger",size:"sm"},on:{click:function(a){return e.deleteButtonClick(t)}}},[a("font-awesome-icon",{attrs:{icon:"trash"}})],1):e._e()],1)]}}],null,!1,944712545)},[a("b-pagination",{attrs:{align:"center","total-rows":e.totalRows,"per-page":e.pagination.perPage},model:{value:e.pagination.currentPage,callback:function(t){e.$set(e.pagination,"currentPage",t)},expression:"pagination.currentPage"}})],1)],1)],1)],1)},l=[],n={props:{data:{value:Array,default:[],required:!1},fields:{value:Array,default:[],required:!1},totalRows:{value:Number,default:0,required:!1},loading:{value:Boolean,default:!1,required:!1},error:{value:String,default:"",required:!1},target:{value:String,default:"",required:!0},commonButton:{value:Boolean,default:!0,required:!1},editButton:{value:Boolean,default:!0,required:!1},deleteButton:{value:Boolean,default:!0,required:!1}},data(){return{search:null,pagination:{perPage:10,currentPage:1,pageOptions:[5,10,25,50]}}},methods:{commonButtonClick(){this.$emit("commonButtonClick")},editButtonClick(e){this.$emit("editButtonClick",e)},deleteButtonClick(e){this.$emit("deleteButtonClick",e)}}},s=n,i=a("2877"),o=Object(i["a"])(s,r,l,!1,null,null,null);t["a"]=o.exports}}]);
//# sourceMappingURL=Elements.630226ea.js.map