import React from "react";

function FormInputField({ 
            classAttribute,
            typeAttribute, 
            idAttribute, 
            patternAttribute,
            numMinAtr,
            numMaxAtr,
            nameAttribute, 
            labelTextTop,
            labelTextBottom,
            placeHolder,
            msgCols,
            msgRows,
            stateValue,
            stateSetter
           
           } ) {

  return (

    <>

      <fieldset className={ classAttribute }>
        { labelTextTop && <label htmlFor={ idAttribute }>{ labelTextTop }</label> }
        { typeAttribute === "message" ? 

                <textarea 
                type={ typeAttribute } 
                id={ idAttribute } 
                name={ nameAttribute }
                placeholder={ placeHolder }
                value={ stateValue }
                onChange={ stateSetter }
                cols={ msgCols }
                rows={ msgRows }
                ></textarea>

                    :

                <input 
                  type={ typeAttribute } 
                  id={ idAttribute } 
                  name={ nameAttribute }
                  placeholder={ placeHolder }
                  pattern={ patternAttribute}
                  min={ numMinAtr }
                  max={ numMaxAtr }
                  value={ stateValue }
                  onChange={ stateSetter }
                />

         }


        { labelTextBottom && <label htmlFor={ idAttribute }>{ labelTextBottom }</label> }
      </fieldset>
  
    
    </>


  )




}


export default FormInputField;