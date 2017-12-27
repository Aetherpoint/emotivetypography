using UnityEngine;

public class Background : MonoBehaviour {

    void Start ()
    {
        GenerateColor();
    }

    public Color backgroundColor;

    // Houses actions for the editor to perform on the game object
    public void GenerateColor ()
    {
        this.gameObject.GetComponent<Renderer>().sharedMaterial.SetColor("_Color", backgroundColor);
    }

    public void Reset ()
    {
        this.gameObject.GetComponent<Renderer>().sharedMaterial.SetColor("_Color", backgroundColor);
    }

}