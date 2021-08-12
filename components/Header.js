import Icon from '@material-tailwind/react/Icon'
import Button from '@material-tailwind/react/Button'
import { TOKEN } from '../constants/AccessToken'
import { useRouter } from 'next/router'

function Header() {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        localStorage.removeItem(TOKEN)
        localStorage.removeItem('role')
        router.push('/')
        location.reload()
    }
    return (
        <div className='flex items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50'>
            <Icon name='assignment' size='3xl' color='blue'/>
            <h1 className='ml-4 text-gray-700 text-lg font-medium'>Text Editor</h1>
            <div className='md:mx-20 flex items-center flex-grow bg-gray-100 p-2 rounded-lg mx-8 focus-within:text-gray-600 focus-within:shadow-md'>
                <Icon name='search' size='2xl' color='gray' />
                <input type='text' placeholder='search' className='flex-grow px-5 text-base bg-transparent outline-none'></input>
            </div>
            <Button 
            color='gray'
            buttonType='outline'
            rounded={true}
            iconOnly={true}
            ripple='dark'
            className='mx-5 border-0'>
                <Icon name='notifications' size='3xl' color='blue' />
            </Button>
            <Button 
            color='red'
            buttonType='filled'
            ripple='dark'
            onClick = {handleClick}
            className='mx-5 border-0'>
                Logout
            </Button>
            
        </div>
    )
}

export default Header
