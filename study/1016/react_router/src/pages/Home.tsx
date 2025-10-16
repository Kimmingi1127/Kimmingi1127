import {FC} from "react";
import { deflate } from "zlib";

type HomeProps = {
    title?: string;
}

const Home: FC <HomeProps> = ({title}) => {
    return <p>
        {title ?? "Home"}
    </p>;
}

export default Home;