import { ReactNode } from "react";

const InputContainer = ({children}: {children: ReactNode}) => (
    <div className={"m-5 bg-slate-300"}>
        {children}
    </div>
);


export default InputContainer;