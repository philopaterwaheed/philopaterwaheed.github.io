
use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    let count = use_state(|| 0);
    let inc = {
        let count = count.clone();
        Callback::from(move |_| count.set(*count + 1))
    };
    html! {
        <main>
            <h1>{ "Hello from Yew + Trunk" }</h1>
            <button onclick={inc}>{ format!("Clicked {} times", *count) }</button>
        </main>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
