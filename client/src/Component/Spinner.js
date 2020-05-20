import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner'

export default function Spinner({start, setStart, formik}) {

    useEffect(() => {
        if(!formik.isSubmitting){
            setStart(false)
        }
    }, [formik.isSubmitting])

    return (
          start && <div className="overlay">
                <div className="overlay__wrapper">
                    <div className="overlay__spinner">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                           // timeout={3000} //3 secs

                        />
                    </div>
                </div>
            </div>
    )
}
