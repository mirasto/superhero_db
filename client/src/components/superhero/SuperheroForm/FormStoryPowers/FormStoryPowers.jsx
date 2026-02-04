import FormSection from '../FormSection/FormSection';
import FormGroup from '../FormGroup/FormGroup';

const FormStoryPowers = ({ formData, errors, onChange }) => {
    return (
        <FormSection title="Story & Powers">
            <FormGroup
                label="Origin Description *"
                id="origin_description"
                name="origin_description"
                value={formData.origin_description}
                onChange={onChange}
                placeholder="Tell the origin story..."
                type="textarea"
                rows={5}
                error={errors.origin_description}
            />
            <FormGroup
                label="Superpowers * (comma-separated)"
                id="superpowers"
                name="superpowers"
                value={formData.superpowers}
                onChange={onChange}
                placeholder="e.g., Flight, Super strength"
                error={errors.superpowers}
            />
            <FormGroup
                label="Catch Phrase *"
                id="catch_phrase"
                name="catch_phrase"
                value={formData.catch_phrase}
                onChange={onChange}
                placeholder="e.g., Look, up in the sky!"
                error={errors.catch_phrase}
            />
        </FormSection>
    );
};

export default FormStoryPowers;
