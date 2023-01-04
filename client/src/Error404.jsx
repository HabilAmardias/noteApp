import './Error404.css';

export default function Error404(){
    return(
        <div className='error-page-container'>
            <div className="error-container">
                <h1 className="error-title">Error 404 Not Found</h1>
                <p className="error-text">Ooops, something when wrong</p>
            </div>
        </div>
    )
}