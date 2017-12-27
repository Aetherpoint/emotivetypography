using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

[ExecuteInEditMode]
public class SetClockTime : MonoBehaviour {

	// Use this for initialization
	void Update () {
        SetText();
	}


    void SetText () {
        TextMeshPro textmeshPro = GetComponent<TextMeshPro>();


        DateTime now = DateTime.Now;
        string date = now.GetDateTimeFormats('d')[0];
        string time = DateTime.Now.ToString("h:mm:ss tt");

        textmeshPro.SetText( time + "\r\n" + date, 4, 6.345f, 3.5f);
    }
}
