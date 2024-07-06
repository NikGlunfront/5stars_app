
export function useScroll() {

    const scrollToRef = (creatorRef) => {
        creatorRef.scrollIntoView({block: 'start', behavior: "smooth"})
    }

    const scrollTop = () => {
        document.querySelector("html").scrollTo(0, 0);
    }
    const scrollBottom = () => {
        document.querySelector('#root').scrollTo(0, document.querySelector('#root').scrollHeight);
    }

    return {
        scrollTop,
        scrollBottom,
        scrollToRef,
    }
};
