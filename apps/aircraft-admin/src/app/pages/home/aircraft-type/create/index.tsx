import React, { useState } from 'react';
import './style.scss';
import { message, Steps } from 'antd';
import {
  adminCreateCraftType,
  ICreateCraftTypeDTO,
} from 'apps/aircraft-admin/src/app/services';
import {
  createCraftType,
  createSeatByClass,
  getAllCraftTypes,
} from 'apps/aircraft-admin/src/app/store/actions/craft-type';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CreateCraftTypeForm from '../../../../components/craft-type/form/create-craft-type';
import BusinessForm from '../../../../components/craft-type/form/create-seat-by-class/BusinessForm';
import EconomyForm from 'apps/aircraft-admin/src/app/components/craft-type/form/create-seat-by-class/EconomyForm';
import EconomyFlexForm from 'apps/aircraft-admin/src/app/components/craft-type/form/create-seat-by-class/EconomyFlexForm';

import { LOCAL_STORAGE } from 'apps/aircraft-admin/src/app/constants';

const { Step } = Steps;

const steps = [
  {
    title: 'Create craft type',
    content: '',
  },
  {
    title: 'Create seat for Business Class',
    content: '',
  },
  {
    title: 'Create seat for Economy',
    content: '',
  },
  {
    title: 'Create seat for Economy Flex',
    content: '',
  },
];

const CreateCraftType = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const craftTypes = useSelector((state: any) => state.craftTypes);
  const dispatch = useDispatch();
  const [_test, _setTest] = useState(null);

  function onFirstStepSubmit(values: ICreateCraftTypeDTO) {
    localStorage.setItem(LOCAL_STORAGE.STEP_1, JSON.stringify(values));
    setCurrentStep((prev) => prev + 1);
  }

  /**
   * TODO: dispatch action of data from first from -> get the result
   *  -> handle validating of input of partial seat of each class based on total in the first form
   *  -> dispatch 3 actions for 2nd, 3rd, 4th form of each form
   *
   */
  async function handleSubmitAllForm() {
    const step_1_data = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STEP_1));
    const step_2_data = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STEP_2));
    const step_3_data = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STEP_3));
    const step_4_data = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STEP_4));

    //TODO: call action for step 1, then promise all for 3 last actions
    const payload: any = await adminCreateCraftType(step_1_data);

    [step_2_data, step_3_data, step_4_data].forEach((ele) => {
      ele['aircraftType_id'] = payload.data.id;
      ele.quantity = Number(ele.quantity);
      ele.rows_quantity = Number(ele.rows_quantity);
    });

    Promise.all([
      createSeatByClass(step_2_data),
      createSeatByClass(step_3_data),
      createSeatByClass(step_4_data),
    ])
      .then((values: { type: string; payload: any }[]) => {
        values.forEach((value) => {
          dispatch(value);
        });
        message.success('Success');
      })
      .catch((err) => message.error('Failure for some reasons.'))
      .finally(() => {
        localStorage.removeItem(LOCAL_STORAGE.STEP_1);
        localStorage.removeItem(LOCAL_STORAGE.STEP_2);
        localStorage.removeItem(LOCAL_STORAGE.STEP_3);
        localStorage.removeItem(LOCAL_STORAGE.STEP_4);
        // getAllCraftTypes().then((res) => dispatch(res));
      });
    //TODO: redirect routing
  }

  return (
    <div className="create-container">
      <Steps
        type="navigation"
        size="small"
        current={currentStep}
        className="step-wrapper"
      >
        {steps.map((item) => (
          <Step className="custom-step" key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content">
        {currentStep === 0 && (
          <div>
            <CreateCraftTypeForm
              formData={localStorage.getItem(LOCAL_STORAGE.STEP_1)}
              handleCreateCraftTypeForm={onFirstStepSubmit}
            />
          </div>
        )}
        {currentStep === 1 && (
          <BusinessForm
            formData={localStorage.getItem(LOCAL_STORAGE.STEP_2)}
            onNext={(values) => {
              localStorage.setItem(
                LOCAL_STORAGE.STEP_2,
                JSON.stringify(values)
              );
              setCurrentStep((prev) => prev + 1);
            }}
            onPrev={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          />
        )}
        {currentStep === 2 && (
          <EconomyForm
            formData={localStorage.getItem(LOCAL_STORAGE.STEP_3)}
            onNext={(values) => {
              localStorage.setItem(
                LOCAL_STORAGE.STEP_3,
                JSON.stringify(values)
              );
              setCurrentStep((prev) => prev + 1);
            }}
            onPrev={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          />
        )}
        {currentStep === 3 && (
          <EconomyFlexForm
            formData={localStorage.getItem(LOCAL_STORAGE.STEP_4)}
            onNext={(values) => {
              localStorage.setItem(
                LOCAL_STORAGE.STEP_4,
                JSON.stringify(values)
              );
              setCurrentStep((prev) => prev + 1);
              handleSubmitAllForm();
            }}
            onPrev={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCraftType;
