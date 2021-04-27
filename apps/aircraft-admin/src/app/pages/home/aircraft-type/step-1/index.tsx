import React from 'react';
import './style.scss';
import { message, Steps } from 'antd';
import CreateCraftTypeForm from '../../../../components/craft-type/form/create-craft-type';
import CreateSeatByClassForm from '../../../../components/craft-type/form/create-seat-by-class';
import { ICreateCraftTypeDTO } from 'apps/aircraft-admin/src/app/services';
import { createCraftType } from 'apps/aircraft-admin/src/app/store/actions/craft-type';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'apps/aircraft-admin/src/app/store';
const { Step } = Steps;

const steps = [
  {
    title: 'Create craft type',
    content: '',
  },
  {
    title: 'Create seat by class',
    content: '',
  },
];

const CreateCraftType = () => {
  const craftTypes = useSelector((state: StoreState) => state.craftTypes);
  const dispatch = useDispatch();
  const { create_step, loading } = craftTypes;

  React.useEffect(() => {
    console.log('current_step', create_step)
  }, [create_step])
  function handleCreateCraftTypeForm(values: ICreateCraftTypeDTO) {
    //TODO: call action here
    console.log('before', craftTypes.create_step);
    createCraftType(values).then((res) => {
      if (res.type === 'CREATE_CRAFT_TYPE') {
        dispatch(res);
      } else {
        dispatch(res);
        message.error('Create failed for some reasons.');
      }
    });
  }

  return (
    <div className="create-container">
      <Steps
        type="navigation"
        size="small"
        current={create_step}
        className="step-wrapper"
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content">
        {create_step === 0 && (
          <CreateCraftTypeForm
            handleCreateCraftTypeForm={handleCreateCraftTypeForm}
          />
        )}
        {loading === false && create_step === 1 && <CreateSeatByClassForm />}
      </div>

      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default CreateCraftType;
