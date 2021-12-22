import { useEffect, useRef } from "react";
import * as DmnEditor from "@kogito-tooling/kie-editors-standalone/dist/dmn";
import dmnData from './test.dmn';

const Kogito = (props) => {
    const dmEditorRef = useRef();

    useEffect(() => {
        const editor = DmnEditor.open({
            container: dmEditorRef.current,
            initialContent: Promise.resolve(""),
            readOnly: false,
            // origin: "",
            // resources: [],
            // resources: new Map([
            //     [
            //         "test.dmn",
            //         {
            //             contentType: "text",
            //             content: fetch("test.dmn").then( content => content.text())
            //         }
            //     ]
            // ])
            // onError: (error) => {
            //     debugger;
            //     console.log("error");
            // }
        });

        fetch(dmnData).then( content => content.text()).then( data => {
            editor.setContent("./", data);
            editor.markAsSaved();
            console.log(data);
        });


        // cleanup
        return () => {
            editor.subscribeToContentChanges( isDirty => console.log(isDirty))
        }

    }, []);

    const styles = {
        height: "500px"
    }

    return (
        <div>
            <h1>Kogito Example</h1>
            <div style={styles} ref={dmEditorRef}></div>
        </div>
    )
}

export default Kogito;