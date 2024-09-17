
import { Button, Form, Input, message, Select } from 'antd';
import React, { useState } from 'react'
import { employeeData } from '../data/db';


export default function CommonInput() {
  const {form} = Form.useForm()

  // for save data
const handleSubmit=()=> {

}

// for validation 
const validationMsg = (val) => {
  const rules = val.map((rule) => {
    switch (rule.type) {
      case 'required':
        return { required: true, message: rule.message };
      case 'maxLength':
        return {
          validator: (_, value) =>
            value && value.length > rule.value
              ? Promise.reject(rule.message)
              : Promise.resolve(),
        };
      default:
        return null;
    }
  });
  return rules.filter((rule) => rule !== null);
};

  return (
    <div>
      <Form 
      style={{width:'500 px'}}
      form={form}
      >
        {employeeData.map((data) => (
          <div key={data.id}> 
            <h1>{data.label}</h1>
            {data.fields.map((field) => {
              switch(field.type){
                case'text':
                case'password':
                return(
                  <Form.Item key={field.id} label={field.label} 
                  rules={validationMsg(field.validation || [])}>
                    <Input id={field.id} type={field.label} placeholder={field.placeholder}>
                    </Input>

                  </Form.Item>
                );
                case'select':
                return(
                  <Form.Item key={field.id} label={field.label} 
                   rules={validationMsg(field.validation || [])}>
                     <Select placeholder={field.placeholder}>
                      {field.options.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>

                  </Form.Item>
                );
                case'button':
                return(
                  <Form.Item key={field.id}>
                    <Button type={field.type} onClick={handleSubmit}>{field.label}</Button>
                  </Form.Item>
                )  
              }
            }
            )}
          </div>
        ))}
      </Form>
    </div>
  );
}




