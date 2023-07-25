export const loginObjs = [
  {
    type: 'email',
    placeholder: 'Enter email',
    name: 'user.email',
    validation: {
      required: { value: true, message: 'Email is required.' },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email format.'
      }
    }
  },
  {
    type: 'password',
    placeholder: 'Enter password',
    name: 'user.password',
    validation: {
      required: { value: true, message: 'Password is required.' },
      minLength: {
        value: 5,
        message: 'Password must be at least 5 characters long.'
      },
      pattern: {
        value: /[^a-zA-Z0-9]/,
        message: 'Password must include at least one special character.'
      }
    }
  }
]

export const settingsObjs = [
  {
    type: 'text',
    placeholder: 'Update Image',
    name: 'user.image',
    validation: {}
  },
  {
    type: 'text',
    placeholder: 'Update Username',
    name: 'user.username',
    validation: {}
  },
  {
    type: 'text',
    placeholder: 'Update Bio',
    name: 'user.bio',
    validation: {}
  },
  {
    type: 'email',
    placeholder: 'Update Email',
    name: 'user.email',
    validation: {}
  },
  {
    type: 'password',
    placeholder: 'New Password',
    name: 'user.password',
    validation: {}
  }
]
