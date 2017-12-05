function Blockshot()
{
    var canvasElement = document.createElement("canvas"),
        canvas = canvasElement.getContext("2d");

    /**
     * Redraws a HTMLElement to the HTMLCanvas recoursively
     * @param {Element} element - DOM tree element which will be redrawed
     * @param {Number} left     - left coordinate of element
     * @param {Number} top      - top coordinate of element
     */
    function redraw(element, left, top)
    {
        switch (element.tagName)
        {
            case undefined:

                canvas.fillText(element, left, top);
                break;

            case default:

                for (var counter = 0; counter < element.childNodes.length; counter++)
                {
                    var child = element.childNodes[counter];
                    redraw(child, left + child.offsetLeft, top + child.offsetTop);
                }
                break;
        }
    }

    /**
     * Redraws a HTMLElement to the HTMLCanvas
     * @param {Element} element - DOM tree element which will be redrawed
     */
    this.shot = function(element)
    {
        canvasElement.setAttribute("WIDTH", element.offsetWidth);
        canvasElement.setAttribute("HEIGHT", element.offsetHeight);

        redraw(element);
    }

    /**
     * Pastes the HTMLCanvas element with screenshot to passed element
     * @param {Element} element - DOM tree element where to post canvas
     */
    this.post(element)
    {
        element.appendChild(canvasElement.cloneNode(true));
    }
}
