using UnityEngine;
using UnityEditor;

[CustomEditor(typeof(Background))]
[ExecuteInEditMode]
public class EditBackgroundMesh : Editor {

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();

        Background background = (Background)target;

        GUILayout.BeginHorizontal();

        background.GenerateColor();

        GUILayout.EndHorizontal();
    }
}

