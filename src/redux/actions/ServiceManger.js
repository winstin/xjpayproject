/**
 @author wp
**/
export const INITDATA = "INITDATA";
export const CHOOSEDATA = "CHOOSEDATA";
export const DetailDATA = "DetailDATA";

import {api,ajax,isEmpty,successToast,errorToast,NetWorkPOST} from "static/utils.js"

/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getInitData(pageno = 1,appId='',appName='',isloading=true){
    return (dispatch)=>{
        api({
            method:'/agents/page',
            mode:'jsonp',
            args:{
                appId:appId,
                appName:appName,
                pageIndex:pageno,
                pageSize:20
            },
            isloading:isloading,
            callback:(rsp)=>{
                if(rsp.data == ""){
                    dispatch({
                        type:INITDATA,
                        dataSource: [],
                        total:0
                    });
                }else{
                    dispatch({
                        type:INITDATA,
                        dataSource: rsp.data.data,
                        total:rsp.data.total
                    }); 
                }
                
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
      
    }
}

/**
 * @Author   Winstin
 * @DateTime 2018-05-09
 * @param    string
 * @license  获取上下游信息
 * @version  [version]
 * @param    {[type]}   appId [description]
 * @return   {[type]}         [description]
 */
export function getDetailData(appId,pageno=1){
    return (dispatch)=>{
         api({
            method:'/rates/page',
            mode:'jsonp',
            args:{
                appId:appId,
                appName:'',
                pageIndex:pageno,
                pageSize:20
            },
            isloading:false,
            callback:(e)=>{
                ajax({
                    method:'/agents/levelAll',
                    mode:'json',
                    args:{
                        url:"/"+appId,
                    },
                    callback:(rsp)=>{
                        dispatch({
                            type:DetailDATA,
                            downDetails: rsp.data.downDetails,
                            upDetail:rsp.data.upDetail,
                            feeDataSource: e.data.data,
                        });
                    },
                    errCallback:(msg)=>{
                        dispatch({
                            type:DetailDATA,
                            downDetails: [],
                            upDetail:[],
                            feeDataSource: e.data.data,
                        });
                    }
                });
            },
            errCallback:(msg)=>{
            
            }
        });
        
      
    }
}


/**
 * @Author   Winstin
 * @DateTime 2018-05-09
 * @param    string
 * @license  冻结服务商
 * @version  [version]
 * @param    {[type]}   appId [description]
 * @return   {[type]}         [description]
 */
export function freezeData(appId,status,callback){
    let sta = "";
    if(status == 0){
        sta = 1;
    }else{
        sta = 0;
    }
    return (dispatch)=>{
        ajax({
            method:'/agents/status',
            mode:'json',
            args:{
                url:"/"+appId+"/"+sta,
            },
            callback:(rsp)=>{
                successToast(rsp.message);
                callback(sta);
            },
            errCallback:(msg)=>{
                errorToast('操作失败！')
            }
        });
      
    }
}




// id: 1
// name: 江苏星洁科技有限公司
// signdate: 2013-11-08
// expiredate: 2033-11-08
// principal: 陈晓峰
// phone: 13365203333
// province: 江苏省
// city: 泰州
// address: 泰州市海陵区青年南路37号402
// accountname: 江苏星洁科技有限公司
// account: 3210200091010000074188 
// bank: 江苏泰州农村商业银行鲍徐支行
// accounttype: 1
// accountprovince: 1
// accountcity: 91321291081599974H
// accountaddress: 1
// idtype: 
// linkman: 792282@qq.com
// linkmantel: 792282@qq.com
// appname: 星洁科技
// website: 

/**
 * @Author   Winstin
 * @DateTime 2018-05-09
 * @param    string
 * @license  修改数据
 * @version  [version]
 * @param    {[type]}   oldData [description]
 * @param    {[type]}   newData [description]
 * @return   {[type]}           [description]
 */
export function updateData(oldData,newData){
    let updateData = {
                id: newData.id == undefined ? oldData[0].id : newData.id,
                name: newData.name == undefined ? oldData[0].name : newData.name,
                signdate: newData.signdate == undefined ? oldData[0].signdate : newData.signdate,
                expiredate: newData.expiredate == undefined ? oldData[0].expiredate : newData.expiredate,
                principal: newData.principal == undefined ? oldData[0].principal : newData.principal,
                phone: newData.phone == undefined ? oldData[0].phone : newData.phone,
                province: newData.province == undefined ? oldData[0].province : newData.province,
                city:newData.city == undefined ? oldData[0].city : newData.city,
                address: newData.address == undefined ? oldData[0].address : newData.address,
                accountname: newData.accountname == undefined ? oldData[0].accountname : newData.accountname,
                account: newData.account == undefined ? oldData[0].account : newData.account,
                bank: newData.bank == undefined ? oldData[0].bank : newData.bank,
                accounttype: newData.accounttype == undefined ? oldData[0].accounttype : newData.accounttype,
                accountprovince: newData.accountprovince == undefined ? oldData[0].accountprovince : newData.accountprovince,
                accountcity: newData.accountcity == undefined ? oldData[0].accountcity : newData.accountcity,
                accountaddress: newData.accountaddress == undefined ? oldData[0].accountaddress : newData.accountaddress,
                idtype: newData.idtype == undefined ? oldData[0].idtype : newData.idtype,
                linkman: newData.linkman == undefined ? oldData[0].linkman : newData.linkman,
                linkmantel: newData.linkmantel == undefined ? oldData[0].linkmantel : newData.linkmantel,
                appname: newData.appname == undefined ? oldData[0].appname : newData.appname,
                website: newData.website == undefined ? oldData[0].website : newData.website,
                staffName: newData.staffName == undefined ? oldData[0].staffName : newData.staffName,
                license: newData.license == undefined ? oldData[0].license : newData.license,
                parentId: newData.parentId == undefined ? oldData[0].parentId : newData.parentId,
                staffIdCard: newData.staffIdCard == undefined ? oldData[0].staffIdCard : newData.staffIdCard,
            };
    return (dispatch)=>{
        api({
            method:'/agents/update',
            mode:'jsonp',
            args:updateData,
            callback:(rsp)=>{
                successToast('修改成功！');
                dispatch({
                    type: CHOOSEDATA,
                    chooseDatas:[updateData],
                });
            },
            errCallback:(msg)=>{
                errorToast('修改失败！原因：'+JSON.stringify(msg));
            }
        });
    }
}



/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取选择数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getSelectId(appId='',){
    return (dispatch)=>{
        api({
            method:'/agents/page',
            mode:'jsonp',
            args:{
                appId:appId,
                appName:'',
                pageIndex:1,
                pageSize:20
            },
            callback:(rsp)=>{
                dispatch({
                    type: CHOOSEDATA,
                    chooseDatas:rsp.data.data,
                });
                
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
      
    }
}

/**
 * @Author   Winstin
 * @DateTime 2018-05-09
 * @param    string
 * @license  添加数据
 * @version  [version]
 * @param    {[type]}   newData [description]
 */
export function addData(newData){

    return (dispatch)=>{
        newData.id = "";
        NetWorkPOST({
            method:'/agents/add',
            mode:'json',
            args:newData,
            callback:(rsp)=>{
                successToast('添加成功！')
            },
            errCallback:(msg)=>{
                if(msg.message){
                    errorToast(msg.message)
                }else{
                    errorToast('添加失败！')
                }
                
            }
        });
    //     // api({
    //     //     method:'/agents/add',
    //     //     mode:'jsonp',
    //     //     args:{
    //     //         id: '',
    //     //         name: newData.name,
    //     //         signdate: newData.signdate  ,
    //     //         expiredate: newData.expiredate  ,
    //     //         principal: newData.principal  ,
    //     //         phone: newData.phone  ,
    //     //         province: newData.province  ,
    //     //         city:newData.city  ,
    //     //         address: newData.address  ,
    //     //         accountname: newData.accountname  ,
    //     //         account: newData.account  ,
    //     //         bank: newData.bank  ,
    //     //         accounttype: newData.accounttype  ,
    //     //         accountprovince: newData.accountprovince  ,
    //     //         accountcity: newData.accountcity  ,
    //     //         accountaddress: newData.accountaddress  ,
    //     //         idtype: newData.idtype  ,
    //     //         linkman: newData.linkman  ,
    //     //         linkmantel: newData.linkmantel  ,
    //     //         appname: newData.appname  ,
    //     //         website: newData.website  ,
    //     //     },
    //     //     callback:(rsp)=>{
    //     //         console.log(rsp)
    //     //         successToast('添加成功！');
    //     //     },
    //     //     errCallback:(msg)=>{
    //     //         errorToast('添加失败！原因：'+JSON.stringify(msg));
    //     //     }
    //     // });
    }
}




/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  选中记录
 * @version  [version]
 * @param    {[type]}   arrIndex [description]
 * @param    {[type]}   arrData  [description]
 */
export function setData(arrIndex,arrData){
    return (dispatch)=>{
        dispatch({
            type: CHOOSEDATA,
            chooseDatas:arrData,
            chooseIndex:arrIndex
        });
    }
}

export function SearchData(appId='',appName=''){
    return (dispatch)=>{
        api({
            method:'/agent/list',
            mode:'jsonp',
            args:{
                appId:appId.trim(),
                appName:appName.trim()
            },
            callback:(e)=>{
                dispatch({
                    type:INITDATA,
                    dataSource: e,
                    total:e.length
                });
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
       
    }
}
