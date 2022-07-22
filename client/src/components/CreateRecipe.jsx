import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../redux/actions";
import ErrorRequest from "./ErrorRequest";
import Loader from "./Loader";

const initialState = {
    name: '',
    summary: '',
    healthScore: 1,
    image: '',
    stepByStep: {},
    diets: []

};
const initialStateErrors = {
    name: null,
    summary: null,
    healthScore: null,
    image: null,
    stepByStep: null
}

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const {recipesState, dietsState} = useSelector(state => state);
    const [form, setForm] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialStateErrors);
    
    
    useEffect( () => {
        dispatch(getDiets());
    }, [dispatch]);
    
    useEffect(() => {
        if(recipesState.isSend && !recipesState.isFailed) {
            setForm({...initialState});
            alert('EXITO!!!');
        }else if(recipesState.isSend && recipesState.isFailed){
            alert('ERROR!!!')
        }
    }, [recipesState.isSend, recipesState.isFailed])
    
    const handlerChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        if(isValidForm()) {
            const newRecipe = {
                name: form.name,
                summary: form.summary,
                healthScore: form.healthScore,
                image : (form.image.trim()==='') ? null : form.image,
                stepByStep: {...form.stepByStep},
                diets: form.diets
            };

            
            dispatch(postRecipe(newRecipe));
        };
    };

    const isValidForm = () => {
        const f = {...form};
        const errors = {...initialStateErrors};
        if(f.name.trim() === ''){
            errors.name = '*This field is required.'
        }

        if(f.summary.trim() === ''){
            errors.summary = '*This field is required.'
        }

        if(f.healthScore < 0 && f.healthScore > 100){
            errors.healthScore = 'This field must be between 0 and 100.'
        }

        if(f.image.trim() !== ''){
            if(!(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(f.image))){
                errors.image = 'This field is only url images.';
            }
        }

        for(let s in f.stepByStep){
            if(f.stepByStep[s].trim() === ''){
                errors.stepByStep = 'All the steps that must add information, remove it(s) or add information.';
                break;
            }
        }

        setFormErrors({...errors});
        if(Object.values(errors).reduce((prev,curr) => (curr !== null) ? prev+1 : prev,0) > 0){
            return false;
        }
        return true;
    };

    const addStep = () => {
        const obj = {};
        obj[Object.values(form.stepByStep).length + 1] = '';
        setForm({...form, stepByStep: {...form.stepByStep, ...obj}});
    };

    const removeStep = (e) => {
        const obj = {...form};
        const newSteps = {};
        delete obj.stepByStep[e.target.name];

        Object.values(obj.stepByStep).forEach((v, i) => {
            newSteps[i+1]=v;
        });
        
        obj.stepByStep = {...newSteps};
        setForm({...obj, stepByStep: {...obj.stepByStep}});
    };

    const handlerChangeStep = (e) => {
        const obj = {...form};
        obj.stepByStep[e.target.name] = e.target.value;
        setForm({...obj});
    };

    const handlerTogleCheck = (e, diet) => {
        setForm({...form, diets: (e.target.checked) ?
            [...form.diets, diet] :
            form.diets.filter(d => d.id !== diet.id)
        });
    }
    
    if(dietsState.isFailed || recipesState.isFailed) return (<ErrorRequest />);

    if(dietsState.isLoading || recipesState.isLoading) return (<Loader />)
    

    return (
        <form className="form">
            <h1>Create recipe</h1>
            <div className="formInputsContainer">

                <div className="formInputContainer">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Name..." name="name" value={form.name} onChange={handlerChange} ></input>
                    {formErrors.name !== null && <p className="errors">{formErrors.name}</p>}
                </div>
                
                <div className="formInputContainer">
                    <label htmlFor="summary">Summary</label>
                    <textarea id="summary" placeholder="Summary..." name="summary" value={form.summary} onChange={handlerChange} ></textarea>
                    {formErrors.summary !== null && <p className="errors">{formErrors.summary}</p>}
                </div>
                
                <div className="formInputContainer">
                    <label htmlFor="healthScore">Healt score</label>
                    <input type="range" min="0" max="100" step="1" id="healthScore" name="healthScore" value={form.healthScore} onChange={handlerChange} />
                    <label>{form.healthScore}</label>
                </div>
                
                <div className="formInputContainer">
                    <label htmlFor="image">Image</label>
                    <input type="url" id="image" placeholder="Url image..." name="image" value={form.image} onChange={handlerChange} ></input>
                    {formErrors.image !== null && <p className="errors">{formErrors.image}</p>}
                </div>
                
                <div className="formInputContainer">
                    <h2>Diets</h2>
                    <div className="formInputCheckContainer">
                        {
                            dietsState.diets.map((diet, idx) => (<label key={idx+100}><input  type="checkbox" name="diets" value={diet.id} onChange={(e) => handlerTogleCheck(e, diet)} />{diet.name}</label>))
                        }
                    </div>
                </div>
                
                
                
                <div className="formInputContainer">
                    <h2>Step by step:</h2>
                    <input type="button" onClick={addStep} value="AGREGAR" />
                    {Object.keys(form.stepByStep).length === 0 && <p>Empty</p>}
                    {formErrors.stepByStep !== null && <p className="errors">{formErrors.stepByStep}</p>}
                    {
                        Object.keys(form.stepByStep).map(step => (<div key={step}>
                            <h2>Step {step}</h2>
                            <div className="formInputStepContainer">
                                <textarea name={step} value={form.stepByStep[step]} onChange={handlerChangeStep} ></textarea>
                                <input name={step} type="button" value="X" onClick={removeStep}/>
                            </div>
                        </div>))
                    }
                </div>
                <input type="submit" value="CREAR" onClick={handlerSubmit}/>
            </div>
        </form>
    );
};


export default CreateRecipe;