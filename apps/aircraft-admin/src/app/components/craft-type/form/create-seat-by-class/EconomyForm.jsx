import React from 'react'
import FormItem from './FormItem';

const formType = {
  id: 2,
  name: 'ECONOMY'
}

const EconomyForm = ({formData, onNext, onPrev}) => {
  return (
    <FormItem
      formType={formType}
      formItems={JSON.parse(formData)}
      onSubmitForm={onNext}
      onPrev={onPrev}
    />
  )
}

export default EconomyForm
