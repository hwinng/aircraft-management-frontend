import React from 'react'
import FormItem from './FormItem';

const formType = {
  id: 1,
  name: 'BUSINESS'
}

const BusinessForm = ({formData, onNext, onPrev}) => {
  return (
    <FormItem
      formType={formType}
      formItems={JSON.parse(formData)}
      onSubmitForm={onNext}
      onPrev={onPrev}
    />
  )
}

export default BusinessForm
