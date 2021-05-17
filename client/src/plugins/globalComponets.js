import Card from "../components/miniComponents/Card.vue";
import BaseButton from "../components/miniComponents/BaseButton.vue";
import BaseInput from "../components/miniComponents/BaseInput.vue";
import BaseNav from "../components/miniComponents/BaseNav.vue";
import BaseDrop from "../components/miniComponents/BaseDropdown.vue";
import CloseButton from "../components/miniComponents/CloseButton.vue";
import ButtonTonggle from "../components/miniComponents/BaseButtonToggle.vue";
import { FadeTransition } from "vue2-transitions";

export default{
    install(vue){
        vue.component(Card.name,Card);
        vue.component(BaseButton.name,BaseButton);
        vue.component(BaseInput.name,BaseInput);
        vue.component(BaseNav.name,BaseNav);
        vue.component(BaseDrop.name,BaseDrop);
        vue.component(CloseButton.name,CloseButton);
        vue.component(ButtonTonggle.name,ButtonTonggle);
        vue.component(FadeTransition.name,FadeTransition);
    }
}