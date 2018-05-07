import React,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'qnui/lib/checkbox';
import DatePicker, { RangePicker } from 'qnui/lib/date-picker';
import Search from 'qnui/lib/search';
import Tab from 'qnui/lib/tab';
import Button from 'qnui/lib/button';
import Table from 'qnui/lib/table';
import * as ChannelStatistics from '../../actions/ChannelStatistics'
// import {getInitData} from '../../actions/ChannelStatistics';
import { Row, Col } from 'qnui/lib/grid';
import Input from 'qnui/lib/input';
import Pagination from 'qnui/lib/pagination';
import Dimensions from 'react-dimensions';
import {FormatDateTime} from "static/utils.js"

const onRowClick = function(record, index, e) {
        console.log(record, index, e);
    },
    getData = (length) => {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push({
                title: {name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`},
                id: 100306660940 + i,
                time: 2000 + i
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a>Remove({record.id})</a>;
    };


class GunsIndex extends Component {
  constructor(props) {
        super(props);

        this.state = {
            dataSource: getData(30)
        };
        this.startDate = '';
        this.endDate = '';
        this.agentName = '';
        this.filterAppId = ''
    }

  onSearch(value) {
      console.log(value);
      const {getInitData} = (this.props);
      getInitData(1,this.startDate,this.endDate,this.agentName,this.filterAppId);
  }


  componentWillMount() {
      // console.log('Component WILL MOUNT!');
  }

  componentDidMount(){
      const {getInitData,emptyData} = (this.props);
      emptyData();
      getInitData();
  }

  handleChange(current) {
    const {getInitData} = this.props;
    getInitData(current);
  }


  cellTime = (value, index, record, context) => {
        return FormatDateTime(value);
  }

  render() {
        const {containerHeight,dataSource,total} = (this.props);
        console.log(dataSource)
        return (
            <div>
                <Row>
                    <span style={{fontSize:'14px',marginTop:'7px',width:'80px'}}>查询条件：</span>
                     <Row>
                        <Input placeholder="所属渠道" className="textClsName"   style={{width:'120px'}} onChange={(e)=>{this.agentName = e}}/>
                        <Input placeholder="渠道编号" className="textClsName"  style={{width:'120px',marginLeft:'12px'}} onChange={(e)=>{this.filterAppId = e}}/>
                        <span style={{fontSize:'14px',marginTop:'7px',width:'70px',marginLeft:'12px'}}>时间选择：</span>
                        <RangePicker onChange={(a, b) => {
                            this.startDate = b[0];
                            this.endDate = b[1];
                        }}/>
                        <Button type="primary" style={{width:'100px',marginLeft:'10px'}} onClick={this.onSearch.bind(this)}>搜索</Button>
                    </Row>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Table dataSource={dataSource} onRowClick={onRowClick} fixedHeader maxBodyHeight={containerHeight}>
                        <Table.Column title="交易日期" dataIndex="sumDate" />
                        <Table.Column title="渠道ID" dataIndex="appId"/>
                        <Table.Column title="渠道名称" dataIndex="name"/>
                        <Table.Column title="交易金额" dataIndex="sumTotalFee"/>
                        <Table.Column title="交易笔数" dataIndex="sumOrderNum"/>
                        <Table.Column title="交易手续费分成" dataIndex="sumTotalProfit"/>
                        <Table.Column title="D0手续费" dataIndex="sumD0fee"/>
                        <Table.Column title="应结分润" dataIndex="sumAgentProfit"/>
                    </Table>
                </div>
                <div style={{marginTop:'20px',float:'right'}}>
                    <Pagination defaultCurrent={1} size="large" total={total} pageSize={20} onChange={this.handleChange.bind(this)} />

                </div>
            </div>
        );
    }
    reduceContent() {
        this.setState({
            dataSource: getData(10)
        });
    }
}

function mapStateToProps(state, ownProps){
    return {
        dataSource:state.ChannelStatistics.dataSource,
        total:state.ChannelStatistics.total
    }
}


function mapDispatchToProps(dispatch,ownProps){
    return  bindActionCreators( ChannelStatistics , dispatch )
}

export default Dimensions({
  getHeight: function() { //element
    return window.innerHeight - 190;
  },
  getWidth: function() { //element
    return window.innerWidth - 24;
  }
})(connect(mapStateToProps, mapDispatchToProps)(GunsIndex))

