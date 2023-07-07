const FieldInput = ({ type, placeholder, name, validation, register }: any) => {
  return (
    <fieldset className='form-group'>
      <input
        className='form-control form-control-lg'
        type={type}
        placeholder={placeholder}
        {...register(name, { ...validation, message: 'enter email' })}
      />
    </fieldset>
  )
}

export default FieldInput
