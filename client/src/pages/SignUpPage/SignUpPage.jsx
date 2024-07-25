import {useDispatch, useSelector} from "react-redux";
import {signup} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import styles from "./SignUp.module.css";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Text} from "@chakra-ui/react";
import PasswordInput from "../../components/PasswordInput";
import Select from "react-select";
import {getQuality} from "../../store/qualitySlice";

const SignUpPage = () => {
    const navigate = useNavigate();
    const {register,control, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch();
    const qualitiesList = useSelector(getQuality)

    const onSubmit = async (e) => {
        const data = {...e, qualities: e.qualities.map((q) => q.value)}
        dispatch(signup(data))
        // navigate('/')
    }
    const options = qualitiesList?.map((option) => ({
        value: option._id,
        label: option.name,
    }))

    return (
        <div className={styles.SignUpPage}>
            <Text fontSize='lg'>SignUp</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email'
                           placeholder='Email'
                           {...register("email", {
                               required: "This is required",
                           })} />

                    {errors.email && (
                        <FormErrorMessage>
                            {errors.email.message}
                        </FormErrorMessage>
                    )}

                </FormControl>
                <PasswordInput placeholder="Password"
                               errors={errors.password}
                               {...register("password", {
                                   required: 'This is required', minLength: {
                                       value: 3, message: "Minimum length should be 4"
                                   }
                               })}/>
                <FormControl isInvalid={errors.name}>
                    <FormLabel
                        htmlFor='name'>Name</FormLabel>

                    <Input id='name'
                           placeholder='name'
                           {...register("name", {
                               required: "This is required",
                           })} />

                    {errors.name && (
                        <FormErrorMessage>
                            {errors.name.message}
                        </FormErrorMessage>
                    )}
                    <Controller
                        name="qualities"
                        control={control}
                        render={({field}) => (
                            <Select {...field} options={options} isMulti/>
                        )}/>
                </FormControl>
                <Button mt={4} colorScheme='teal' type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpPage