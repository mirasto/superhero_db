import FormSection from '../FormSection/FormSection';
import FormGroup from '../FormGroup/FormGroup';

const FormBasicInfo = ({ formData, errors, onChange }) => {
    return (
        <FormSection title="Basic Information">
            <FormGroup
                label="Nickname *"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={onChange}
                placeholder="e.g., Superman"
                error={errors.nickname}
            />
            <FormGroup
                label="Real Name *"
                id="real_name"
                name="real_name"
                value={formData.real_name}
                onChange={onChange}
                placeholder="e.g., Clark Kent"
                error={errors.real_name}
            />
        </FormSection>
    );
};

export default FormBasicInfo;
