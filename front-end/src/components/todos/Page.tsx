import { Container, TextField } from "@mui/material";

const Wrapper: React.FC = () => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    return <Page onChange={onChange} />;
};

interface IProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Page: React.FC<IProps> = ({ onChange }: IProps) => <Container sx={{ paddingTop: 3 }}>
    <TextField label="Add Todo" variant="outlined" onChange={onChange} />
</Container>;

export default Wrapper;