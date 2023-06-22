import {genChartByAIUsingPOST, listChartVOByPageUsingPOST} from "@/services/awangBI/chartController";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import {Button, Input, message, Select, Space} from "antd";
import Form from 'antd/es/form/Form';
import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import {InboxOutlined, UploadOutlined} from "@ant-design/icons";


const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  useEffect(()=>{
        listChartVOByPageUsingPOST({}).then(res=>{
        console.log('res', res);
      })
  })

  const onFinish = async (values: any) => {
      console.log(values.file);
      const params={
        ...values,
        file:undefined,
      };
      try {
        const res = await genChartByAIUsingPOST(params,{},values.file.file.originFileObj);
        console.log(res);
        message.success('分析成功');
      }catch (e:any){
        message.error('分析失败,'+e.message);
      }
  };

  let normFile;
  // @ts-ignore
  return (
    <div className="add-chart">
      <Form
        name="add_chart"
        onFinish={onFinish}
        initialValues={{}}
        style={{}}
      >

        <Form.Item name="goal" label="分析目标">
          <TextArea placeholder={"请输入你的分析诉求"} />
        </Form.Item>

        <Form.Item name="name" label="图表名称" >
          <Input placeholder={"请输入图表名称"} ></Input>
        </Form.Item>

        <Form.Item
          name="chartType"
          label="图表类别"
        >
          <Select placeholder="选择你的图表" options={[
            {value:'折线图',label:'折线图'},
            {value:'柱状图',label:'柱状图'},
            {value:'堆叠图',label:'堆叠图'},
            {value:'饼图',label:'饼图'},
            {value:'雷达图',label:'雷达图'},
          ]}>
          </Select>
        </Form.Item>


        <Form.Item
          name="file"
          label="原始数据"
        >
          <Upload name="file" >
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
        </Form.Item>


        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
