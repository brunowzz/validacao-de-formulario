import { useForm } from 'react-hook-form'
import formLogo from './assets/form-logo.png'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import './App.css'

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
  password: yup.string().min(6, 'A senha deve conter no mínimo 6 caracteres').required('A senha é obrigatória'),
  confirmPassword: yup.string().required('A senha deve ser confirmada').oneOf([yup.ref('password')], 'As senhas devem coincindir')
})

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    { resolver: yupResolver(schema) }
  )

  return (
    <form onSubmit={handleSubmit()} >
      <img src={formLogo} alt='image-logo' />

      <label>
        Nome
        <input type='text' {...register('name')} />
        <span> {errors.name?.message} </span>
      </label>

      <label>
        E-mail:
        <input type='email' {...register('email')} />
        <span> {errors.email?.message} </span>
      </label>

      <label>
        Senha:
        <input type='password' {...register('password')} />
        <span> {errors.password?.message} </span>
      </label>

      <label>
        Confirme sua senha:
        <input type='password' {...register('confirmPassword')} />
        <span> {errors.confirmPassword?.message} </span>
      </label>

      <button type='submit'> Cadastrar-se </button>
    </form>
  )
}

export default App
