function Blockshot()
{
    var canvasElement = document.createElement("canvas"),
        canvas = canvasElement.getContext("2d"),
        shootingElement = null,
        shootingCoords =
        {
            top: 0,
            left: 0
        };
    document.body.appendChild(canvasElement);

    /**
     * Redraws a HTMLElement to the HTMLCanvas recoursively
     * @param {Element} element - DOM tree element which will be redrawed
     * @return {Object}         - object with top and left coords
     */
    function getCoords(element)
    {
        var parent = element.offsetParent,
            coords =
            {
                top: 0,
                left: 0
            };

        while (element && element.offsetTop !== undefined && element.offsetLeft !== undefined)
        {
            coords.top += element.offsetTop;
            coords.left += element.offsetLeft;
            element = element.offsetParent;
        }

        coords.top  -= shootingCoords.top;
        coords.left -= shootingCoords.left;

        return coords;
    }

    /**
     * Remove unnesessary spacing and tabulation
     * @param {String} text - text to edit
     */
    function formatText(text)
    {
        var regexp = /\s+/g;
        text = text.replace(regexp, " ");

        regexp = /^\s/g;
        text = text.replace(regexp, "");

        regexp = /\s$/g;
        text = text.replace(regexp, "");

        return text;
    }

    /**
     * Setts a text styles
     * @param {Element} element - DOM tree element from what style will be got
     */
    function setTextStyle(element)
    {
        var style = window.getComputedStyle(element);
        canvas.fillStyle = style.color;
        canvas.font = style.fontStyle + " " + style.fontSize + " " + style.fontFamily;
    }

    /**
     * Redraws a HTMLElement to the HTMLCanvas recoursively
     * @param {Element} element - DOM tree element which will be redrawed
     * @param {Number} left     - left coordinate of element
     * @param {Number} top      - top coordinate of element
     */
    function redraw(element)
    {
        switch (element.tagName)
        {
            case undefined:

                var text = element.cloneNode(true),
                    span = document.createElement("span"),
                    coords;

                element.parentNode.insertBefore(span, element);
                coords = getCoords(span);
                span.textContent = element;

                setTextStyle(element.parentNode);
                canvas.fillText(formatText(element.textContent), coords.left, span.offsetHeight + coords.top);
                element.parentNode.removeChild(span);
                break;

            default:

                for (var counter = 0; counter < element.childNodes.length; counter++)
                {
                    var child = element.childNodes[counter];
                    redraw(child);
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
        shootingElement = element;
        shootingCoords = getCoords(shootingElement);

        canvasElement.setAttribute("WIDTH", element.clientWidth);
        canvasElement.setAttribute("HEIGHT", element.clientHeight);

        redraw(shootingElement, 0, 0);
        formatText("           i    d\n\ng  ");
    }

    /**
     * Pastes the HTMLCanvas element with screenshot to passed element
     * @param {Element} element - DOM tree element where to post canvas
     */
    this.post = function(element)
    {
        element.appendChild(canvasElement.cloneNode(true));
    }
}
