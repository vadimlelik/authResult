import {Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {forwardRef, useState} from "react";

const PasswordInput = forwardRef(({errors, ...props}, ref) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <FormControl isInvalid={errors}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    {...props}
                    ref={ref}
                />

                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>

            </InputGroup>
            {errors && (<FormErrorMessage>
                {errors.message}
            </FormErrorMessage>)}
        </FormControl>
    );
})

export default PasswordInput