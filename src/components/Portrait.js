const Portrait = ( {location, filename} ) => {

    const assets = require.context('../../public/data/game_assets', true);
    const load_image = imageName => (assets(`./${imageName}`).default);

    return (
        <img className="portrait" src={load_image(`${location}/portraits/${filename}.svg`)}/>
    );
}
 
export default Portrait;