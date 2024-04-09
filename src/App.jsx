import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

function App() {
    return (
        <>
            <GlobalStyles />
            <div>
                <Heading as="h1">Test</Heading>
                <Heading as="h2">Test</Heading>
                <Heading as="h3">Test</Heading>
            </div>
        </>
    );
}

export default App;
