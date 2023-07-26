const FieldInput = ({
  type,
  placeholder,
  name,
  validation,
  register,
  isLoading
}: any) => {
  return (
    <fieldset className='form-group'>
      {name === 'user.bio' || name === 'article.body' ? (
        <textarea
          disabled={isLoading}
          className='form-control form-control-lg'
          rows={8}
          placeholder={placeholder}
          {...register(name, { ...validation })}
        ></textarea>
      ) : (
        <input
          disabled={isLoading}
          className='form-control form-control-lg'
          type={type}
          placeholder={placeholder}
          {...register(name, { ...validation, message: 'enter email' })}
        />
      )}
    </fieldset>
  )
}

export default FieldInput
