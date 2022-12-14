import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    createJob,
    editJob,
    clearValues
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }

    if (isEditing) {
      editJob()
      return
    }

    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job type */}
          <div className='form-row'>
            <label htmlFor='jobType' className='form-label'> job type </label>

            <select
              name='jobType'
              value={jobType}
              onChange={handleJobInput}
              className='form-select'
            >
              {jobTypeOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}> {itemValue} </option>
                )
              })}
            </select>
          </div>

          {/* job status */}
          <div className='form-row'>
            <label htmlFor='status' className='form-label'> Status </label>

            <select
              name='status'
              value={status}
              onChange={handleJobInput}
              className='form-select'
            >
              {statusOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}> {itemValue} </option>
                )
              })}
            </select>
          </div>

          <div className='btn-container'>
            <button className='btn btn-block submit-btn' type='submit'onClick={handleSubmit} disabled={isLoading}>
              {isEditing? "Edit" : "Add"}
            </button>

            {isEditing && <button className='btn btn-block clear-btn' onClick={clearValues} >Cancel</button>}
          </div>

        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob