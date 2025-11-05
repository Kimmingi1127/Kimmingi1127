import InputFocusExample from "../components/inputFocusExample";
import ParentComponent from "../components/UseImperativeHandle";
import UseIdExample from "../components/UseIdExample";
import DeferredValueExample from "../components/UseDefferedValueExample";  
import UseTransitionExample from "../components/UseTransitionExample";

export default function ExamplePage() {
  return (
    <div>
      <h1>ExamplePage</h1>
      <InputFocusExample />
      <ParentComponent />
      <UseIdExample />
      <DeferredValueExample />
      <UseTransitionExample />
    </div>
  );
}