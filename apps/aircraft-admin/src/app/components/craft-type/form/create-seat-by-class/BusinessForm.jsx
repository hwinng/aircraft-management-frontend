import { LOCAL_STORAGE } from 'apps/aircraft-admin/src/app/constants';
import React from 'react'
import FormItem from './FormItem';

const formType = {
  id: 1,
  name: 'BUSINESS'
}

const BusinessForm = ({formData, onNext, onPrev}) => {
  const _step_1_values = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STEP_1));
  return (
    <FormItem
      formType={formType}
      formItems={JSON.parse(formData)}
      totalSeat={_step_1_values.seat_capacity}
      onSubmitForm={onNext}
      onPrev={onPrev}
    />
  )
}

export default BusinessForm
