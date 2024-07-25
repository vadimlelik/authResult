import {useDispatch} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import styles from './LoginPages.module.css'
import {login} from '../../store/authSlice'
import {useForm} from 'react-hook-form'
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react'
import PasswordInput from '../../components/PasswordInput'

const LoginPages = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        dispatch(login(e, navigate,))
    }
    return (
        <div className={styles.LoginPage}>
            <Text fontSize='lg'>Sign In</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input
                        id='email'
                        placeholder='email'
                        {...register('email', {
                            required: 'This is required',
                            minLength: {value: 4, message: 'Minimum length should be 4'},
                        })}
                    />
                    {errors.name && (
                        <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                    )}
                </FormControl>
                <PasswordInput
                    placeholder='Password'
                    errors={errors.password}
                    {...register('password', {
                        required: 'This is required',
                        minLength: {
                            value: 3,
                            message: 'Minimum length should be 4',
                        },
                    })}
                />
                <Button mt={4} colorScheme='teal' type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default LoginPages
