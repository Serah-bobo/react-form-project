import { useForm ,useFieldArray} from "react-hook-form"//hook for managing forms validating etc
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";


//register is used to register a field
//uusefieldvalue used for dynamic fields works  with objects
//onerror and fielderror
const Form = () => {
    const {register, control,handleSubmit,formState:{errors},isDirty,isValid,isSubmitting,reset,isSubmitSuccessful}=useForm({
        defaultValues:{
            username:"",
            email:"",
            channel:"",
           phNumbers:[{number:""}],
           age:0,
           dob:new Date(),
        }
    });

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset();
        }
    })
    //usefield
    const{fields,append,remove}=useFieldArray({
        name:'phNumbers',
        control
    })
    //function 
    const onSubmit=(data)=>{
        console.log( data)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className="max-w-md mx-auto">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm  font-bold mb-2" htmlFor="username">Username</label>
            <input 
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="text"
            id="username"
            
            placeholder="username"
            {...register ("username",
               {
                required:{
                    value:true,
                    message:"Username is required",
                },
                minLength:{
                    value:3,
                    message:"username must be at least 3 characters long"
                },
                maxLength:{
                    value:20,
                    message:"username cannot exceed 20 characters"
                },
               
               }
            )}
            />
        </div>
            <p className=" font-semibold text-red-700 items-center">{errors.username?.message}</p>
            
        <div className="mb-4">
            <label className="block text-gray-700 text-sm  font-bold mb-2" htmlFor="email">Email</label>
            <input 
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="email"
            id="email"
            placeholder="email"
            {...register ("email",
            {
                required:{
                    value:true,
                    message:"Email is required",
                },
                validate:{
                   notAdmin: (fieldValue)=>{
                        return(
                            fieldValue!=="admin@gmail.com"||"Enter different email address"
                        )
                },
            },
               })}
            />
        </div>
            <p className="font-semibold text-red-700 items-center">{errors.email?.message}</p>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm  font-bold mb-2" htmlFor="channel">Channel</label>
            <input 
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="text"
            id="channel"
            placeholder="channel"
            {...register ("channel",
                {required:"channel required"},
            )}
            />
        
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm  font-bold mb-2" htmlFor="twitter">List of  phone numbers</label>
            <div>
                {fields.map((field,index)=>{
                    return (<div key={field.id}>
                        <input 
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="text"
            {...register (`phNumbers.${index}.number`,)}
            />
            <div>
            {index>0 &&
            <button 
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none"
            type="button"
            onClick={()=>remove(index)}
            >
                Remove phone number
            </button> 
            
            }
            </div>
                    </div>
               ) })}
            </div>
            
            
        </div>
        <div className="mb-4">
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
            type="button"
            onClick={()=>append({number:""})}
            >
                Add phone Number
            </button> 
        </div>
        
        <div className="mb-4">
            <label className="block text-gray-700 text-sm  font-bold mb-2" htmlFor="age">Age</label>
            <input 
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="number"
            id="age"
            placeholder="age"
            {...register ("age",
                {
                    valueAsNumber:true,
                    required:{
                    value:true,
                    message:"age is required"
                }
                },
            )}
            />
        
        </div>
        <p className="font-semibold text-red-700 items-center">{errors.age?.message}</p>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm  font-bold mb-2" htmlFor="dob">Date of Birth</label>
            <input 
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="date"
            id="dob"
            placeholder="dob"
            {...register ("dob",
                { 
                    valueAsDate:true,
                    required:{
                    value:true,
                    message:" date of birth is required"
                }
                },
            )}
            />
        
        </div>
        <p className="font-semibold text-red-700 items-center">{errors.dob?.message}</p>
        <div className="flex items-center justify-between">
            <button 
            disabled={!isDirty||!isValid||isSubmitting}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
            type="submit">
                submit
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
            type="button"
            onClick={()=>reset()}
            >
                Reset
            </button>
            <DevTool control={control}/>
        </div>
    </div>
    </form>
  )
}

export default Form