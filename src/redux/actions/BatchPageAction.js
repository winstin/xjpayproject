/**
 @author wp
**/
export const INITGUNSDATA = "INITGUNSDATA";
export const CHOOSEDATA = "CHOOSEDATA";
export const GETDATA = "GETDATA";

import {api,isEmpty,getNowFormatDate,buildStr} from "static/utils.js"
import config from 'static/config.js'
const webUrl = config.webUrl;
/**
 * @Author   Winstin
 * @DateTime 2018-05-04
 * @param    string
 * @license  获取数据
 * @version  [version]
 * @param    {Number}   pageno [description]
 * @return   {[type]}          [description]
 */
export function getInitData(pageno = 1,startDate=getNowFormatDate(),endDate=getNowFormatDate(),orderNo='',agentOrderNo='',agentName='',filterAppId='',merchantName='',mchId='',orderState='',result='',upstream=''){
    let appId = localStorage.getItem("appId");

    let serchData = {
                startDate: startDate,
                endDate: endDate,
                orderNo: orderNo.trim(),
                agentOrderNo: agentOrderNo.trim(),
                agentName: agentName.trim(),
                filterAppId: filterAppId.trim(),
                merchantName: merchantName.trim(),
                mchId: mchId.trim(),
                orderState: orderState,
                result: result.trim(),
                pageIndex:pageno,
                pageSize:20
            };
    if(upstream != ''){
        serchData.upstream=upstream
    }

    return (dispatch)=>{
        api({
            method:'/orders/page',
            mode:'jsonp',
            args:serchData,
            callback:(rsp)=>{
                if(rsp.data.data == ""){
                    dispatch({
                        type:INITGUNSDATA,
                        dataSource: [],
                        total:0,
                        countMerchantNum:0,
                        countOrderNum:0,
                        totalMoney:0,
                        totalProfit:0,
                    });
                }else{
                    dispatch({
                        type:INITGUNSDATA,
                        dataSource: rsp.data.data,
                        total:Number(rsp.data.total),
                        countMerchantNum:rsp.data.countMerchant,
                        countOrderNum:rsp.data.countOrderNum,
                        totalMoney:rsp.data.totalMoney,
                        totalProfit:rsp.data.totalProfit,
                    });
                }
                
            },
            errCallback:(msg)=>{
                // console.log(msg)
            }
        });
    }
}



export function exportData(pageno = 1,startDate='',endDate='',orderNo='',agentOrderNo='',agentName='',filterAppId='',merchantName='',mchId='',orderState='',result=''){
    return (dispatch)=>{ 
        let params = {
                s1:1,
                startDate: startDate,
                endDate: endDate,
                orderNo: orderNo,
                agentOrderNo: agentOrderNo,
                agentName: agentName,
                filterAppId: filterAppId,
                merchantName: merchantName,
                mchId: mchId,
                orderState: orderState,
                result: result,
            };
        params = buildStr(params);
        if(params!=''){
            params = '?'+params;
        }    
        document.location.href = webUrl+"/orders/export?s1=1" + params;
    // api({
    //     method:'/orders/export',
    //     mode:'jsonp',
    //     args:{
    //         s1:1,
    //         startDate: startDate,
    //         endDate: endDate,
    //         orderNo: orderNo,
    //         agentOrderNo: agentOrderNo,
    //         agentName: agentName,
    //         filterAppId: filterAppId,
    //         merchantName: merchantName,
    //         mchId: mchId,
    //         orderState: orderState,
    //         result: result,
    //     },
    //     callback:(rsp)=>{
           
    //     },
    //     errCallback:(msg)=>{
    //         // console.log(msg)
    //     }
    // });
    }
}


export function getData(pageno){
    return (dispatch)=>{
        dispatch({
            type: GETDATA,
            pageno: pageno
        });
    }
}


export function emptyData(){
    return (dispatch)=>{
        dispatch({
            type:INITGUNSDATA,
            dataSource: [],
            total:0
        });
      
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

export function SearchData(appId,appName){
    return (dispatch)=>{
        ajax("/agentrate/list",{
            appId:appId,
            appName:appName
        },"GET",function(e){
            // console.log("GoodsListTable：", e);
            dispatch({
                type:INITGUNSDATA,
                dataSource: e
            });
        });
    }
}
