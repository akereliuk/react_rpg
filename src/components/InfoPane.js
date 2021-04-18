import InfoHeader from './InfoHeader';
import TextPane from './TextPane';

const InfoPane = (props) => {
    return (
        <>
            <InfoHeader title={props.title}/>
            <TextPane content={props.content}/>
        </>
    );
}
 
export default InfoPane;