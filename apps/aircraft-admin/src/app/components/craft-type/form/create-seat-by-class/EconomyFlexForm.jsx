import React from 'react'
import FormItem from './FormItem';

const formType = {
  id: 3,
  name: 'ECONOMY FLEX'
}

const EconomyFlexForm = ({formData, onNext, onPrev}) => {
  return (
    <FormItem
      formType={formType}
      formItems={JSON.parse(formData)}
      onSubmitForm={onNext}
      onPrev={onPrev}
    />
  )
}

export default EconomyFlexForm
