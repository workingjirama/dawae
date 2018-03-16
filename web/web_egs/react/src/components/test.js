import React from "react";
import {Uploader, UploadField} from '@navjobs/upload'

export default class Test extends React.Component {

    render() {
        return (
            <Uploader
                request={{
                    fileName: 'paper',
                    url: '/dawae/web/egs/tempo/test',
                    method: 'POST',
                    fields: {/*full_name: 'Testing extra fields',*/},
                    headers: {/*Authorization: 'Bearer: Test',*/},
                    withCredentials: false,
                }}
                onComplete={({response, status}) => console.log(response, status)/*do something*/}
                //upload on file selection, otherwise use `startUpload`
                uploadOnSelection={true}
            >
                {({onFiles, progress, complete}) => (
                    <div>
                        <UploadField onFiles={onFiles}>
                            <button class="btn btn-success">
                                Click here to select a file!
                            </button>
                        </UploadField>
                        {progress ? `Progress: ${progress}` : null}
                        {complete ? 'Complete!' : null}
                    </div>
                )}
            </Uploader>
        );
    }
}
