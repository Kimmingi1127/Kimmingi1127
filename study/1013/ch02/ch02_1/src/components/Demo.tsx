import * as D from '../data/index';

// export defalut function Demo() {}
// const Demo = () => {}

export default function Demo() {
    const children = D.makeArray(10).map((notUsed: any, index: number) => (
        <div key ={index}>
            <p>{D.randomId()}</p>
            <p>{D.randomName()}</p>
            <p>{D.randomJobTitle()}</p>
            <p>{D.randomSentence()}</p>
            <img src = {D.randomAvatar()} width={100} height={100} />
        </div>
    ));
    
    return (
    <>
        <h1>Demo</h1>
         <p>
            {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()}
        </p>
        <img src={D.randomAvatar()} width = {100} height= {50} alt = "avatar" />
        <img src={D.randomImage()} width = {100} height= {50} alt = "randomImage" />
    </>
  )
}