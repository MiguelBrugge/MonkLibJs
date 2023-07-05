import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function SpyButton({ href, text, className, icon }) {
    return(
        <li>
            <a className={`bg-white shadow-md rounded py-2 px-5 font-bold text-black hover:brightness-90 flex gap-3 align-middle ${className}`} href={ href }>
                { icon ? <FontAwesomeIcon className='my-auto' icon={ icon } width={20} /> : "" }
                { text }
            </a>
        </li>
    );
}