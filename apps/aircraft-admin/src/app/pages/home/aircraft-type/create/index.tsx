import React from 'react';
import './style.scss';
import { Button, message, Steps } from 'antd';
import { ICreateCraftTypeDTO } from 'apps/aircraft-admin/src/app/services';
import { createCraftType } from 'apps/aircraft-admin/src/app/store/actions/craft-type';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CreateCraftType = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

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
  function handleSubmitAllForm() {
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
              localStorage.setItem(LOCAL_STORAGE.STEP_2, JSON.stringify(values))
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
              localStorage.setItem(LOCAL_STORAGE.STEP_3, JSON.stringify(values))
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
              localStorage.setItem(LOCAL_STORAGE.STEP_4, JSON.stringify(values))
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
