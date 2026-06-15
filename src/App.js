import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";

const WALDEN_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAB4CAYAAACtrl1lAAAujUlEQVR42u19eZxcVZX/95x7q/dOJ+kkXfWqFwk9KM0gSxQIuyCOMCyyOfNzwYXFBXGUwVHHkVHHURlZRkFBGQX3UVRQWRwF2YVhE5SJIm20k673ujt7b+nuevec3x99X3gpqkMSsvPO51OfVLqq3rvv3vO9Zz8XyCijjDLKKKOMMsooo4wyyiijjDLKKKOMMsooo4wyyiijjDLKKKOMMsooo4wyyiijjDLKKKOMMsooo4wyyiijjDLKKKM9gSibgh0611s73+pfGWWA2OWJZ3hfycSyDe+zqXtl4MkAsUN3d65gvM1i9Pnz5zc1NDTMm5ycVFXdrHknIq2traXx8fGVK1asGN2C8ZrUuLXilVEGiK3ajSnFUG6mLxaLxXZVJVWdT0SHAlBVtQBOIqJ6VQWAOiLam4jmb5W+pLpCVf9MRJOqGhMRqep9RBT5MS4noiedc2ZgYKDvBYBCWwrmDBAvzXlIQCBVGMW0t7fn4zgOjDEHiUgHMy9W1ToARxARiAjMnDDwRj92zo0BGFXV8lYNjqhGVWuMMbOJKP33DfcTkeT9H4ioJCL9zPxrERk0xjzW398fVXmuNPAlA8hLFxCbBEBnZ2ehXC4fAqDD7/R7EdErEqZPGN45pwAGVHUQwMMAhIicqt4mIpPWWhCRAnikv79/yt9za9QWBaBBELySiGYn92bmo4io4MGwmIjaADQw8+wEpAlYRORZIupV1dsBLM/lco8sW7YsmgEgic2jGSD2fDuAKlWgefPmFXK53CFEdAiAIwEcZYyhhKGcczGAUFXvIqIRVb2NmWNjzO/nz5+/8vHHHy/vCg+4aNGi3MqVK83k5OShRFRHRCcCaAJwAoDZxphZqWdSAPerah8R/SqO4/uGhoaWzmCLvGTA8VIABFcBgSkWi69W1YMBvBHA0QkAnHNQ1WVEdKeIPAvg8Vwu9/RmML6t2NGxDT1MM3ma0usXbwoog4ODFsAhqno4gG5VfS0RdTIziAhxHAPAPQB+TUQ/tdY+09fXt/alBg7ag5/LVKhDtlgsLgJwiqqewcz7MjOccxCR5QDuZOZfEdFTs2bNembJkiVTm2D6ai5O3YXWkyv+/zyw9PT01AwPD78cQFFETlTV05m5wxiTqFgrieg2Vf3xxMTEPatXrx6umAe3JwJjTwME+1ec8gIdBuBkv+A9zIw4jssAfkNENwO4vb6+/pne3t7JTTD/7u62pCo2wkYg6e7urp2YmNhHVQ8UkbOI6HXW2jqvXq0kolsBXFcqlR5LSVu7pxnjtAcBYYNq4l2hJwM4g5lP8CBwRHQHgB9Ya3/Z19c3MAMABC8Nnz1VvOJKx4Jz7rWqeiaA11tra73k+B2ALxPRraVSqb/a/GeA2EWA0N7efoiqnqyqF1lrZ/vd7VFVvSWXy91QxatidzMAUMUuv8kYyWZeI9nh0+DYKEbR0dERlMvlE4joQmZ+tTEGcRwPA7iJmb/a39//yJ4CDNqNx00piXCoql5CRGf5xZokov8Wke9EUfTLKiqV24X0/q1SBXfANarZYSgWiwcAuEBVz7TWtnmp8WPn3GWDg4O7PTB2R0DYZFHb29sPEZEPEdFZ3kAOvTj/Rkqc7wgjMGGeeDtc26QAnMvn84cT0RwiEiKqKZVKN2+GlNhwjba2tkZr7dEiUmutVefcsjAMf5OSDJv1fPl8fj4zXwDgDcaYV/l4x4+Y+bL+/v5HU8DYrdTP3QkQGxbV2whXpYAQAbhWRK4bGBhYUWFAuh0wh7o9nzmfz3cZY96nqicS0X5JgLBcLt8URdGbXsCwZQBSKBQONsa8W0ReR0RdyTXiOP7HMAyvrADeC0nmSsfFGar60QQYqnoTEV2eUqXsdtosXrKAYL/gXCwWP6Kq/2SMaUmA4Jz7yuDg4NAM0qBaUp5sS4YNgqCDiM4tlUqf2IYgsQDiIAjeQUTXGGMaPLNN6yIi14dheEGFPVHNVnBBEPwrM38iibKLCIgIInJJGIZXbCYYXkhqULFYPENEPpbL5Q7y8ZyrAXwyDMNVKfVLM0C8OIZTAFIsFk9S1U8aY14lIqOq+h8zACEtHbbG6Ky26NXUrWTnnUdEd1lrX1kul2+MoujcbaA/J2C40BhzjXPuUQDfB7CKiPZT1bowDC/ahEqyAQzFYvFaInq3iPyPiNzMzBMAjlLVP0ZR9B9bCYZq6yQAtL29vV5EPgTg3dbaQhzHv1fVf4+i6DtVVMAMEFuhInGhULjcGPNBH0m+Q0QuGRgYWFLhKarqPuzp6akBgLVr1y4yxjRNTU2Fg4OD/7cZu/gL6dTU2tqar62tfYiZO51zZWbOlcvlA4aGhn6bkmpbqya9y1p7naqeVSqVfrSFY7QA4mKx+GVVfaeIHDUwMPDoJiTvNldr8/n8fCK63Bhzjl+3HzrnLvQbWA5AeVdkOrsrgyEIgoMAXG2MOcI5FxLRB8Iw/KFnAptazI0Wta2t7RBr7WIAi9euXXukqoKZiwDAzN8A8PYKb1NVRsnn8/OttRfHcfxjz1BpBtL6+voJEfmOiHwQgCEiZ4w5BMDWAoI9GHqMMV8SkU+EYfijKuukm3ASWABxoVA4j4jeo6oHDQwMPOmZsDKqvq13apdIVW/LvS2fz/+MiP45l8udRUT7FQqFD0ZR9D+7qqSgXXA8xqsLJwP4oTGmVkRujeP43JR6ZCqlQRAEhwP4ewBnGmMCr2dDVZOszzIzs3Puc1EU/csmDD32O1wHM9/JzN3OuX2jKPrDTExeLBZ/QERni8iEc65ncHDwz1tpRzAADoLg9wAawjAsbqHuzQB03rx5+dra2uWq+v0wDN8MoAbA1E5YSwbgurq66srl8leY+RwRUVX9WBRFn02rxLuSsborguFKIvoZM9c65/6xVCqd5sFgUztLPH/+/KZCofDRIAhCInoQwJsBPKmqF01NTb0GQIeqdvkaAauqrKpPzmCEbqSGMPO3jTHdzrnSPvvs0zvDb3J+PD/wtQm9dXV1EbYuzdt4W+kNxphuIvrvComw2R6vXC73FSIiZv7KDvK0VaNEipm+vr7JMAzf5py7CMCItfYzQRBc5T+XXYkP7S4EBgYQ5/P5q4wxH3DOrVDVi8Iw/H7qcwXgWltbm+vq6i5U1X/y9Qc/juP4i4ODg89W2wmDIJgEQKoKa+0zm2AyA0Da29v/RlWPFBEhoj+Ojo7SDNIhWfQxTFfK/aivr2+iQp3bXJLu7u7asbGxS73O/dOtUTM7OzsXOedOEZFxa+3vdoEdOFGjbBRF1wRB8KCI/MQY84EgCMzY2Nil69atW7sd7JndVkJQSne+KpfLfcA5NwjgbzwYLJ6LSrtCoXBaXV3dUgAfZOZ/bWlpKYZh+C5vKE95xrD+xa2trc0Amv29xkXkhVQHdc69HwCIiFX1jz7te8a58vEBUtWHt3BH38ibNj4+voiZ9xeRcSIa3MJrMQCUy+XTvXv1KRGZwNYXJW1raREDsGEY/qZcLr/aOXebtfaixsbGuzo7OwspPnjJS4jEV36lMeYDIjKkqidFUfQbr5I4AOIjrF8A8A4Any2VSp9KSQOTcj+69G6fy+VeAWChZ9xnoyh6JgWw5xnSHR0de4vI0b522QKoe4GFhqq+0jm3vKmp6e4Xo6Ko6lnGGI3j+Flvs2yJ+9b19PTUrFmz5jT//+X9/f3rt1JabS+KAZihoaFBAGcWCoUf5nK5k+M4/hqAk/BczcVLVkIYv+tfaYz5oIgMiciJURQ9kTJ6EzD8gojOFZFjSqXSv6SkAaV0Ua3CZOMV99ukQVoulz9MRI2q6nwg7LYZduoEyK3MfIyI/LdPId+aRU0Y9lhVJSJq2op1lJGRkQ4iWujHPbyLehCdn6OpxsbGs5xztxpjTiwUClf4z3IvVUAkrtVTjTEfdM5FFWBwAHj+/PlNxpjbARwiIkdEUfSAnzTCpvOTCACstQcn9cUAfjnDcyfMvQ8zv1VElIgSxh55gbk72adBfGcLd/SNgBgEwT4AXuH/9tQWrk+iLh2UdPowxvwcuy45ANTb2zspIn8Xx/Fya+3FhULhE5iOT9iXGiASP38XgG97ff1cD4aclwwMwFlrb7HWHq2qbwnD8Nd4LqizuXrxgalOFSMzuJsZgIrI2caYOn9tVtUyEY1tSl0CcJ5z7slSqfRUykVa6TmzFa/nSRFmriWiev/f327m+mx0fWY+OHk2EanZjN9aPBfV5xnWybyAfk8pO4+3gKcEgImiaBzA6SKykpk/UigUTkit/0sGEORB8CVrbbNz7pOlUumOFLNbr0q9z1p7fLlc/qE3sLc4wqmqazfclGh4hrG49vb2emPMRXEcXwfg58zMqjrY2Nj4SJWdP/nNXABHEtEXKoDGaa+YX+D0y1XOhXPuuKSNDYDZmwmE5PoT/rr7+meOmXndJoxyThm6MoMnKgG324SnyqSuk3xnSySk896nx0XkI0RUS0Rfzefz8/HiWn/uVkZ1kqfzNmPM38Zx/FhjY2MSpNkgGbq6uvYtl8v/LiKxqn5tK7w3khi8fsdUZv5FFeY2AGLn3AXMvICIvgLgJz6JjsrlMs3ACLGIXAggZubvp1S4DRHY9vb2uap6PICFIsLMTL5r3+9mz5798yVLliTeKweg1Y8XAJ58IekKwHV3d9eOj48fRUSv8q1ouv01huvq6h6cQYVL7LZ5zPxWVT2NiGaJyN1RFH0Yz8UF4iAIDgTwIWbet1wuf3xwcPC21PMxALdgwYK2XC73PlV9PRFNOefO92k1m+tGjQHkoij6WhAEi62155bL5Y8CuBg7IUvW7gTJID4B7FLvFrwgZYwmKRnlcrl8NjPPcs6tYeZHUzvKFgGCiA5KmNs5VzOTdFDVj4rIPUS0HEDnC8xPArbzmfkr/f39Eyk1KG5ra/tra+2Vqnq8MYaTaLkfDwBg1apV+wN4uru7m3t7e+GT7qCqGsfxEzNsABZA3NLSMqehoeGK8fHxs40xTUkqdxKZB1ATxzHPZLf5gqpbmXle0uDMWntQoVBYEkXRDZhO/XgzM387ya41xnwCwG0Vm9obAVzHzHNEJOlZdR2A12zh5uUAsLX2M86504jo/GKxeGWpVCphB8cndrTKZKY3a3mjtXahc+67vjglnanqurq66lT1DJ1eDXXOTWy1A1x1zDPhYC6XCysYLfEsLSaiNiL6WHNz85S3HQDg/r6+vqkUWBNmkHw+fwYRBc65TwJAT08Pe0Z6n7X2AVWNReQLcRxfFsfxrSKyWkQmRSR2zvUDGPKGZewl2AkeOGStreZlynmwHdvU1PQsEZ0G4Abn3H+Uy+Ur4jju1+daBo7U1NS4CpXDesfBe4noYSJa75xboqpj3qPmACwAIEEQvI2Zvy0if1bVKVUVAPWpTSQOguC/jDHfB7DGObdSVZ1zzqnqPj09PYm6RVuwefGyZcuWisinrbVNIvKBxJbbU22IDdJBVS91zk3kcrnPVMQECIA45xqIqFtV1Rgz1xjz1q3xuuTz+X2Zudu7IZf5murn5RgZYz7nnPttGIYPDQ8Pn8rMxicErqyysDK90dN/ALh1YGBgRVdXV+2SJUumfLr21QDOC8PwpCiKLg7D8CNRFJ2iqucSUY2PbZR8Kkr62ef5f1cC6K8ArgFQbmtrOzaXy92tqnerakcYhu8Pw/DDURRd4ltrjng75L7e3t7hFJAZQNze3r4/EX3JOXdeqVTaOwzD/ZxzxwEY9k6EtYVC4ShjzI1EdAyAE4moJmUTMaazaG8E8CoROT4Mw72dc2+n6R3kxSTsOQA8Z86cr8VxvIyI3uudLm5H8invYPCJc+5gY8xC59yjy5cv/xOqBMmm7Vl1zMwi8hQz37mFojNh4EYADV5Vaa5g7CTN+mhjzKuJ6KuYTu/IExF76dJUzYjM5/OvYOa94zi+DAD39fVN5PP5d1trrxGRC0ul0g8xnVBnAdT6sS/zQAIR3VPpuSGiCV+0szwMw+VpT0wyTmvtz1X1/jAM3+i9MzXJfVR1ngdbparHALDXXnu1qeqDqvqfURR9LWHcwcHBR1R1iKZpKYDr4zj+WH9//30iMivVp3YM07lWN6jq/mEYLiqVSr/y0u1xVXVeqo7W19frVhjECoCXLFkyCuC/rbX1zHzWjpYSO8PLdKbvFndlFXeeAjDLli0bAfAbL7Jf29/f37sVRjUSMHj6vf/9RhVmzPwZERl0zt0IQI0xIyl16+kqQFMi+pyqPjA0NPQQpouE3pTL5a4tl8t3hWF4rVdvplIeJSWi/VPXXQNAu7u7DaaLaroBvMKrTM0V3ipduHBhCzN/i4h4fHz8LSlba8qDJhaRA4iowTNwZet8mZiYuBHAZBiGH0q5SY0Haatz7rdRFN0J4EtRFF3mJcb6xO5R1W8UCoVPeKlwiL9vjZ/DVp2OKEJV7/OpLmYr1ksBUBzHt8h0WuwZfi73OBuCAMjcuXNnEdGZcRyvGx8fvwfVK9oUQExEH3DOHRdF0coq/v3NkhDMfGKq6e8jFb51LRQKRxpjjhCRfx8cHBzzu93xqTLN/03vXt478wpmPhXAPwGgtra2vZj5KlUVVf3UDC5KVdVjkjfMvBQAampq1LtcZ2G6BysAPJO6HwOQ9evXf9YY0+mc+9qaNWuWVfO+MLNJvb8NADzgpFAoHGWtfb2qfi+lgmwoRGLmeUT0VgAuiqKrExAR0cu91HJEdBYRXcLMp6SuIf5+xxljaryaOfoi+EQA6NDQ0KPOuaVEtHjevHnzsAMzYnckILSurq4FQKeqDq5bt27dpjw4YRg+OTg4+Be8iNwgIopT72dVAd75zrnVjY2NX028RERUTDFWTRXf/WUi8uswDB/y9sc/M/MC59yztbW1j2DjwiMCEHd3d9cS0Ws8IMgY8xgALFmyRAAgl8tNeCkCAI8AQFdXVw2AuKOj4yhmfo93G/+gig2UBBHPqnz+lpaWhJE+5WMT3/LfnwIwlc/n32KtvVZEzi2VSr/1c2ASviCiQ1O1JMeo6qd9ADLtBNlonlOeqK3tcp6A/S5jDOVyub1nCKbu9oAAER1qjFEAd6Z0Xd3E2LY2U9N55js6VZj/TMobJMVisZ2Z3ywin+7t7Z30nhEkaoJ/b1NjcUEQvJyZTyWiSwBQPp+fB+BMry487lO/qfIZRkZGFhPRy7wUKYuIAYBFixYRAMRx/BpvlD4PuM65N04n0uoq3zUvXUNNmM71mkdER/txiKpOAMDjjz9eDoLgUGY+1jlXjuN4rK2tbUE+n+8JguAbzPxfzrnzwjD8esog3pAOk+RDEVGtiPRHUfT5CsM5UUGPS6Sqqm4TniKitX5KDt5jASEigTfeNif14sX0DE0WNEjUFAAPVagwl6rqaG1t7bXemCu3tbUtIKID/Ofjxph+D6JkV74MwENeOigRvZaIZvtg2y+rLBwBEGZ+r1fdGMAT/f39fwLAjz/+OLwhX0ja1CfA7evrmywUCvMAvNVf52mvPnKF90mZ+e3M3OhjLeustQ+kHvR0IlIissz8W2vtoLX2/4jolc65Rd7AthXGq3qm3MdLSlLVm/D8Bm8JOBf48Q/U1dU99SIkxIbficgdXgXboRmwO9So9kDYUWi3Fe7cRq+mxMVisZ2Izgfwsb6+volFixYZD4Im7/4kVV113nnnPQ2AlixZUg6C4OXe939xavyvT72nKh6puFAonGCMOVtE4hmkoqYAjDiOH0r9/aBEYqjqE9i4UIoA6Ny5c2cB+EgSYANA1trkPzVEtNgDlgGUVfUe59z7S6XSQb6GJMkQSG9Azhvbi1OnE327Ql0jAOrrTeb5McbnnHNOZV+sreWVZCx/m1al9zQv044AgvExiAN9DEK9V2dlsmOr6udU9XdhGH7J79TOqycTeC5Xim+88caaFBNcJiIPl0qlh71B3gDgMM8IE6loeuIqxYIFC9qI6DsicjeASa8C3OMN3hyAcqFQ6CSi9/rqPBBRXcqG6fGFR/DxAK0MtNXV1V3DzAJgrf/7hgKo1tbWWlXdz/83VtUjwzB8TcpwTgxjUywW29vb2/86bS+p6ojf+ZfW19f/qWLnJ++Vmw+gx0u3/nvuuYdTINvqwqRErazwFO6xgNjuwBARC4AT/7r37ZMPPL0ZwAexcYNf5HK5w33tNQDQ+Pi49Tr6yV46/F3y3ZqamhoAhYQJ169f35fawR0Al8vlfkxEvyWiLxNRg2fy5QC4t7e3jOlOHbcx89zEO8XMST4Xi8ipiTszNW/sXZHlIAguJKK3xnF8diood+/SpUuH/bM3edtEAbjx8fGlnllzKaDnADhV/baIXJDwhU9cTIKF65YuXVo1WdBaa1V10gPnf++9997Ye+POb2trO/ZF8Nl6v9ncvSfaEIk+O+V17/IOuNdEFSAKEf2nc+6HYRjelWJe8h6jjiQoB4BWrFgxDoCMMdf4gNayRYsWWf9dTUmTmtra2iBxGQdB0Nre3n4DgL8mojeKyOIUYzIAaW1tbSwWi9cDGHfOPcXMRkT+LwzD33lX6aXGmOOSkldVnUx5iMr5fP7dxphrAJxsjOklogUVhq7kcrmrmXm2iEwxc0NDQ8MFFW5XAjDlO5wsAnCD/yyemprah5k7vHSqFmhL5ukEY0yt1/ebvCv6Zcz8VWZu2QpmTlzmx3iJ2bcnAkI8E90tIuSc2wvbrydqUhh0tN9ZBcC8BQsWtBWLxU8BeHkulzsfVSLknukSHZYKhcLcIAi+SEQchuHFAEyiXiVf84xQR0RvmTt37qwgCBYT0YOq+vflcvnI/v7+1Yn9IiIqIne0t7fvX1dXdx+AU5n5REyXqSp82nexWPwoM39cRPpSEuvIrq6u2fl8ft8gCK7L5XLXOueuL5VKt/ma7lrPvBOYTpH5OBEd7Jx7mJmtiDhmvsRnsE4mKo1vlfkzETnZ55UlqspYKth2hx+fqbLxpCvchgGotfYmVX0giqJbsZVtMomoHTuhFnxHZbuq94CsBbDG58kk0dztBYwOby84AO3W2l4AjUT0Wn92GlcBRI1fPFHVOUT0rD/R89WVXhBmTnbNWEQYwEfr6urexczzRWRYRBYNDQ0t8YbtCUmiIoDvqeqBANzU1NSiXC43j5lf7m2IYrFYvA/A4ap6OBEdRkSXi0iZiA4tl8vPGGMW+K4c7/VRccPM61NG8auDILhLVY+N4zjI5XKvY+ZvxnE8AWCeqj5cKBRuJaJxAAcbY/Zzzn1oYGDg3rQjwlqb5BHZzVhb8XN2XBAEjwCY7xvFbWke0oYqSFVd5JwjAHfviUa1AqAoilaq6iPW2tn5fP4wbJ9OC0n098dej87xtHJdG8fxcT7/pmrkm4giXzqaM8bUepfqG5cvX/5YSr1SALa3t3cE06cR2Wl8sDHGzFfVW8vl8iJfE5AEmca9LWOstQcCWKmqR69YseKpQqHwZxFZTkTsX4eLyOu9a/ep5BmICMaYBQCWi8hpYRhe293dXQvAEZH4giZrjNmXiA5zzr1xaGho0Fp7k3Pum9baOq+C1Fprz7TWvhVA0Tl3eBiGl6cM4UQ1eZ1/NgDo24QrVX13EmutPQCAm5ycXOwTKbc0dZsAaEtLyxxmPlBElopICdu3w/rzPTI7iAwAaWlpaWXmE51z60ZHR3+OLU/L2CzwjY2NhY2NjT1EtEBVb1bVcwcGBh5CRZQ19Rtua2t7dmpqam8ARVW93Tl3YRRFt88k9uvr6x81xrQAeJmq3iMi/xSG4b+Oj4+vTgFdmpqa/kREb1DVZwBcPzk5+c7BwcHfY7paLG5ubq7xdRt3i8iboii6v6enp2bp0qW9TU1NY0S0SFVDVf3W5OTkO4aGhh4DkFu9enUZ03UEf2Hm/Zi5QVW/45x7U/Ks69atmxoZGbmlubl5WFVbALSo6q9E5FsA3hqG4R8rno8AaHNzcwHA0qmpqYsHBwd/WkXFVAA8a9asZ1X1ECJSEflYGIbvHh8fH8XW1TEYADJnzpz35nK5k1X1+iiK7sCu1Tlkm0oj6ujoCIIgWBsEQbhw4cIWbOdSwc7OzjlbKhG9h2WzfxMEQesLSV5fFmln+k7FOE3aHurs7JzT3t5eP8NGtsFz52MC1a6xYX4XLFjQtg21hOS61ruh8SLWc8NRX0EQPFosFuOOjo5X4bkkxD2SrGeg73Z2dmqhUPjodrJlkkk0KeYwm+EKtqmx2JQnhqosNAGwSXfxlOfmhVRTi+pBPFR4f6oxv53BdV1ZCFTtPOv0b02VcVQ+J88wB9XWlLbBOhrPG6d2dHRoEAQP7AQtZofHIRQAMfN/+kM73t/T09OEbZfNWFl871Ki3m1qTHiuWD6JA8Qpm6HyWN4k2hynzrPeVDfx9PNVC1i51PccNk6j2ChRENXPxdaK71RruZn+bdL4wFR8J/2SGeag2hnYmnr/YiQNVPVf/L9f3hk7ttkJgDDDw8P9jY2NLblc7oTx8XE7MjLyy21oS+jChQtb6uvrT2hpackPDw/3pZ610jjjtra2hrGxsSkANgiCkxobG83o6OgK7wVLt2gxFUxqi8XiiY2NjXuPjo72VTBDtVoAxcYHuTwPyD09PTlmrhsbG0unUST31Sprp6lNIB3n4Jkk5sKFC5sLhYKuWLHC4fnNFiqfU5NxtbS02NWrVyeg3fAMxWLxuJaWlsbh4eGhF6H6Jl1WLrLWnhfH8c+iKPpn7ISW+TujHT4D0La2tvnGmN8T0ew4jo8fHBy850VMAHndv05E/hPA2QD6iciJSD0RXUhEX1PVP4Zh+LrE4AuC4G4i+gMz/5uI/I+q1gFoU9WvEtExRNTq84CSI6jWRFF0cKFQ+DARvR9ACUArEdWp6nVhGH4a0xV1VzHzQWEYHovnThpqIKLHAHzJp4xsaAWfz+f3NcbcISJrAaw0xnSLyBfDMLwyCIIfMfOiOI7PGhgYeAwAfMeMJ4joTFVtZuavO+duDsPwg0EQXMfMr4/j+D0DAwN3eDXkeGb+mohMqeoTRPTKxAUchuFnfTziHiLqFJFJZs6p6qestf/jnHtIVYd9BeNcEbkyiqIvtLe3d6vqTarKRNSlqjcksZotlBRJ44O/AvCoB8fhpVLpd6jecnSPUpk2qA+Dg4NDqnqR91d+r6uraza2rn52w9nKzrnvG2MuIKJ/CMPwlaVS6SAAPwDQ4BetCwB8Mh9UdamqluM4/qKq7huG4V+p6llE9Agz/z8iegcRvQzAAhE5k5n/Lp/PfyGXy31OVb8UhuEhYRjuDeAGa+2ngiD4jAfP3saYY9ra2o5LdlRVPdoYs6+vAkurajDG5Ji5i4hqGhsbz1DVUWPMFfl8fl8iavGfpY3qBlWdT0QlVZ3nPy/4ewfM3IXnCo7gnKv3fxuMouhNPg3lz7lc7t8KhcLn/Bj/ioi6ALxfRE6y1v5EROb53+WstWf5uoirOjo6Aufcp1V1vzAMD3DOvZaIfoMtP3GUPMAbVPXrzNyiqp/0tRk7pRv4zmpUljSo+q5z7ovGmHy5XL7Fe1q21EuRPmXzlDiOnyqVSt9KVIQoii611v7JT+54RdxhyNc8tBDReLFYfFcURXeGYfiD/v7+3rGxsSdVNQYwHkXRE7W1teuMMe+P4/jPURR9JlE5rbWfLpfLq1X1A76T9YH++p9MJCIRfchHkmurxD/Ud7Yo9/b2jqoqOed6Aaz050BvlArvnLMABpYvXx6qqvF1FkmKR9IlY6MCHv+3lQCkVCo9Ozo6ek4cx6uI6JzOzs45qrpOVcUY83QURX9YtmzZGn+ehojIuK9/n1DVuFwul4loIRG5QqHw4YGBgd+USqVvYsuKudJNCT5hrT0yjuN7jzjiiCuxE08X2pm9XR0Abmho+Lhz7n5r7TFxHF+N5xre0pbsMkR0ts+5uRMbpx4bz0DP0619dNgB+BkzNxPRdUEQ9PrTiLihoaEZ09VoFgBPTEwcZ4xxAB5IXY8mJibSXqJ6AGtF5I/W2iMLhcKBxWLxWABznHO9qjq/q6tro47invEYQHcQBH2+48jb/bFUDRXPkwAo7d3hCu8TV/EgcargyQ4PD68TkVEiWrB+/fpWX/XGzrn7isXin4IgeJtzbq1XiYJisfhlImoQkXMHBgZWENH3mLnOWvu5IAj+0NbWdugW8FT6cJxLrbUfKpfLzzQ2Np5600037dTzLHYmIBSA9vb2Dk9MTJwcx/F9xpg3B0GQdPbeos4Nqlr2zJKrMC41VcUlAGj9+vWE6UzTA1S1KYqiLzrnPiQif2HmvVT1WwCkXC6XsXFioEsZnRt6mdbV1SWq3ni5XH4tgGWqmhQFfUZV/w3Ap4hoDTPvUy6Xu1LGKfwh7CCiflX9fwAGmPnbPn08KS91FQb2JqO3qmrw/D6yabAIACsi61V1LPW9S4jo7+M4/rm1NqneayGi94jI2oGBgW8BsKVS6Srn3KnOuV8ZY7qZ+ZsVY9sUGJJGZ//KzJ8UkREA5/vWOTssKr2rAWKD52X16tXDExMTpzjnHjTG/FuxWLzWB5kUm5dLA2PMTd4APh6prNC0quTVFfWuUofpRshD3d3dtWEYXh6G4V7OuYeIqAMAfJ2B89m5OWvt/eVyeT2A4/zvJzGdk3SUtXY2gJ+ISEhEs8MwvM859xdm/htVnRVF0S0A5vt2LWNVnsGJyHgURQ+oaq8x5mWqmgewipnJNy92mE4RP7yi1HSDSuWBI6q6Ghv3kU3UKsF0tuxR1toiEf1i5cqVEaY7aEhNTc0d/f39jw4NDQ2KiPWFOg/HcXy9tfagIAguxHSPp/owDH8WhuHxcRx/nYj2wgufhZcAphwEwceZ+ROqOhLH8alRFN2PXeAgxl3hBCFJgeIkD4p319TU/GT+/PlNflFzL6R69ff3/05Evmut3a9QKHwvCILFQRAsLhQKPy2Xy05Vr7TW7lssFr9cLBYPC4LgEkz3ibpifHz8rkKh8Pm2trZDiGg/AL/ytkGNzzZtnjt3bn1fX98AEV1qjCkUCoXv++ufTkTf9OdQXGqMOQ1A4MH4eV+jcL3ftR+w1hoAhwAb6rshIjmfQzWvUCi8DsDhcRz3T01N9RHRFSIixpivFovFk/L5/NG+hc/nPWibfcp6o79HCxGxtfZ9xWLx80EQ/J2XQMzMnUEQLC4Wi/9gjPmFc+4pa+17PCM2ExGXy+Wr29vbr8jn88dgOgeLAbQy8+X+mIBr8vn8vs65G4MguNJn975KRH6VkswznY4qra2tzYVC4VpjzKdUdcw5d4r3MFrsAqeS7iohcQXA69evn7DW/sgYc0QulzuGmY9taWl5enh4ePkMcYSNwD0yMvLT+vr6PzLzoQDOAfAGAA81Nzff0tfXd3tDQwMBOJuITgIwV1XPGRwc/EtTU9M8InozEb2BiH40e/bsd65YsUJzuZwaYw4noqc7Ojq+F0URRkZGHmxsbHyYiBYR0XkAjieiH6rqu6MoWtrU1LQ/gL+Mjo7+oqmp6f9UtZmIvjQyMrK+ubm5i5mLqvrzkZGRZ3t6eqivr0/mzp2LOI4PIyJl5pOJ6GYA7125cmVpZGSkv7Gx8WEA7UR0DjMfD+CK2bNnX7NixQrX2NjIzHyYiNw8Ojr6v01NTUXvOs4T0at804RbAByD6aZppwN4ORFdNTk5edHAwMAqANTU1PRy3+jsFZguXb2zXC7/lplfB+DRMAy/0dzc/Adm3ldVV6vqUmZ+JxGdDOCuKIrePsPabDCe29raXpbL5b6fy+XOcs49AuAt/ryPHd7UeHchBoCFCxe2BEFwfUdHhxaLxdEgCN5ZsdPszFgMbcNrbc69trcUp+00TxttuPl8/vVBEKzyaRn3d3d3z9pO67lHSIiNJMWaNWsmRkZGftbU1AQieq0x5g1NTU0HNjY2Pjw6OrrmBSK+Nm1bYOOosakAX3INs4k5qeYGrjRu0/dMX5c283qVuULp6+kM99OK3zKen1pBM9yTsfG5fKjyu0qvVWVLyU3NWeLQcF1dXbMbGxs/b4z5IhHVi8hnnXPvWr58+WgmGbZs17I+aHNUEASPdHZ2ahAEa6pIC8qma9dbt5RU+GNnZ6cWi8VlhULhDdtRmu6REqLS2Lajo6N/sdb+wBgzj4gWM/Npzc3NBzc2Nv5pdHS0PwUMzfhxpwNB4I9KmzVr1o3GmE8TUWscx19X1bP9kWmmQoLvcg+yq9MGV1w+nz+amS+31r46juNYVb+gqlcPDAz0pT0Z2AOLSXZhIGzIXcrn811EdBERnW+MmSUiy0XkH6IourlyLXflB9qtJt4f0XuBqv6jMabonFunqtcDuDqKomUV9oEgkxzbU7NwFUA4zxjTIiJOVS+z1l6+bNmyNXguk1l3B0bb3bxQAmw4v+1iAB81xrBzblxEvkxE/xWG4TMVdkYmNbbN3KfrylEoFDoBvI+ILjDGtDjnHIAbReRKX1O+W0iF3RkQ1cR0jzHmHar6ZmttwTkHX0N9ZRRFj+C5TnaUAlQmNTZ/risLlVAoFI4kovcCOMVa2xTHsajqjap6RQUQdru5pt18sSgtMUTk7QAuttYWRQTOuWcAXMvMt5dKpWcrRD5lkmOTkkArQNAJ4HQiOoOZj2ZmxHEcEdF34zi+wfeJTeZWd9d5pT1oAWNguuBfVV/ni4KOMMYgjmMAuBfAjblc7hbfl6naLvhSlB4zPn9XV9fsqamp1xDRWap6ei6Xq/fNjx9U1VsA3BCG4ao9AQh7EiCqqlIA0NnZ2RPH8XkATjPGLAQA59ywqt4L4Be5XO72ZcuWLZ3hOmkG0T1ojtJG8fNOcOro6Ng7juNDfXrLyb7NDpxzfQB+zMy39Pf337en2mh7YlAr3XAYANDT01OzevXqxcx8hqqebq3t8N3v4MHxsKo+BOBBfwZDNa9K+mw6Sb3f1VXKdHT5eVHhOXPmtNTX1+/HzKeKyGFEdIwxJmnNv46I7gLwjUKhcIc/Oy4NBLenSdQ9Pcq7kTqVgGPdunWHq+rpAA5l5kP9geNwzk0BeBjArwH8hpmfWL9+/eCqVatGZrh+tTycak3QtueaVTuHYSZGtUEQtAA4HMARAPZR1WOMMXOZOdkg/gLgp865m0XksRUrVoxWPK/uTl6jDBCblhpUuUt2dnb2iMhBInKSqh7FzB3GTGsUzjmIyGp/jO6zRPSoiAzU19c/vXTp0nE81/17U7Stk9c2K/dn4cKFLSMjI/NqamoOEJGAmY8SkQOJ6GXGmBrfNAEiMkJEd6vqA8aY25n5T/5oMFSoVy8J++qlmAc0Izi6urrqJicnFxpjDlbVE1W1m4j2Z+Z6X9eQMNGoqg4CeAzAFDP/zDckdtbaB8bGxmIAWLVq1cRmgmZLKNfa2lqnqpTL5RwzH2SMmaeqOVU9xQOwE8ABRNSUqD8e4E5VQwAPMvNtcRyXpqamnlizZs26KiDWl6KTIUuM27jW+nm7b2dn55zJyckDrLXtqnqSr284FkAdM9tE3dqgqzgHTLeFB4BVqvqor7hL2x0E4HeYPjs73V0ieb8vgP2xcTkmqWqOiA4B0Oq7iTf4jh3wDQwS1Q+YPqv6ft884DYA46r6QHNz87re3t7JGWykPc2JkAFiGxuiVdWTpA/r5OTkAcaYPBEVVPUoz0gNAI7EdEmmISLjD6p/3nXSQNpoEFR9WbyO71Q19kdtPUlEof/4fgChP8vu3tra2nKFe7maGveSlAIZILadioXNMSq9/976CjiN4/hYa22d37k3d+43YlJv1zwiImtEhIlIZ/CIzeQdSxv8GQAyQGyXeasEykyepu0NVmSMnwFid5rXbVV3UqneZAyfUUYZZZRRRhlllFFGGWWUUUYZZZRRRhlllFFGGWWUUUYZZZRRRhlllFFGGWWUUUYZZZRRRhlllFFGGWWUUUYZZZRRRhlllFFGGWWUUUYZZZRRRhlllFFGGWWU0Xah/w/aVuHlkL8hbAAAAABJRU5ErkJggg==";

// ── STORAGE ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = "buildtrack_v1";
function loadSaved() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveToDisk(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ["Not Started","In Progress","Complete","Blocked"];
const STATUS_COLORS  = {"Not Started":"#6B6B6B","In Progress":"#F59E0B","Complete":"#22C55E","Blocked":"#EF4444"};
const PHASE_COLORS   = ["#1A1A1A","#4A7B6F","#2B4C7E","#6B3FA0","#B04A4A","#3A7CB0","#8A7340","#2B7B5A"];
const TODAY = new Date().toISOString().split("T")[0];
const uid = () => Math.random().toString(36).slice(2,9);
const fmt$ = v => (!v && v!==0)||v==="" ? "—" : "$"+Number(v).toLocaleString();
const num  = v => parseFloat(v)||0;

// ── DEFAULT PHASES ────────────────────────────────────────────────────────────
function pouredWallPhases() {
  const T=(l,d)=>({id:uid(),label:l,duration:d||1,deps:[]});
  return [
    { id:uid(), label:"Site Prep", color:"#C17A3A", tasks:[
      T("Boundary Survey",1),
      T("Clearing Survey",1),
      T("Temp Toilet",1),
      T("Lot Clear",1),
      T("Silt Fence",1),
      T("Order Trusses",1),
      T("Order Mailbox",1),
      T("Confirm FFE w/ Approved Engineer Survey",1),
      T("Schedule Poured Walls",1),
      T("Rough House Stake",1),
      T("Piling Pad Elevation",1),
      T("Piling Pad",1),
      T("Piling Stake",1),
      T("Dumpster",1),
      T("Permit Plans to Lumber Supplier",1),
      T("Piling Steel Delivered",1),
      T("Piling Steel Install",1),
      T("Piling Survey",1),
      T("Piling Survey to FDEP",1),
      T("Piling Inspection Engineer",1),
      T("Pour Pilings",1),
      T("Build House Pad",1),
      T("Water Meter Install",1),
    ]},
    { id:uid(), label:"Site & Foundation", color:"#8A7340", tasks:[
      T("Good House Stake",1),
      T("Pad Compaction Test",1),
      T("Footer Steel",1),
      T("Pool Footer Required",1),
      T("Dig Footers",1),
      T("Footer UFER Ground",1),
      T("Footer Insp",1),
      T("Pour Footer",1),
      T("Stemwall Material",1),
      T("Stemwall Labor",1),
      T("Form Boards",1),
      T("Cabinet Layout Complete",1),
      T("Measure Forms",1),
      T("Form Check Survey",1),
      T("Plumber / Pool mark Stemwall for penetrations",1),
      T("Stemwall Insp",1),
      T("Pour Stemwall",1),
      T("Backfill Stemwall",1),
      T("Water Softener Pre-pipe",1),
      T("Underground Plumb",1),
      T("Underground Plumb Insp",1),
      T("Order Slab Pack",1),
      T("Slab Prep",1),
      T("Mono UFER Ground",1),
      T("Floor Plug if App",1),
      T("Slab Insp",1),
      T("Pour Slab",1),
    ]},
    { id:uid(), label:"Slab & Pre-Wall", color:"#B04A4A", tasks:[
      T("Foundation Survey as required",1),
      T("Order Windows",1),
      T("Grade Around",1),
      T("Window ROs",1),
      T("Exterior Door ROs",1),
      T("Electrical Box Locations",1),
    ]},
    { id:uid(), label:"Wall System (Lifts)", color:"#2B4C7E", tasks:[
      T("Poured Wall Steel Install 1st Lift",1),
      T("Extend Waste Pipes 1st Lift",1),
      T("Poured Wall Steel Insp 1st Lift",1),
      T("Poured Wall Forming 1st Lift",1),
      T("Embed Straps 1st Lift",1),
      T("Strap Layout 1st Lift",1),
      T("Poured Wall Pour 1st Lift",1),
      T("Deliver Trusses 1st Lift",1),
      T("Deliver Lumber 1st Lift",1),
      T("Set Floor Trusses 1st Lift",1),
      T("Poured Wall Steel Install 2nd Lift",1),
      T("Extend Waste Pipes 2nd Lift",1),
      T("Poured Wall Steel Insp 2nd Lift",1),
      T("Poured Wall Forming 2nd Lift",1),
      T("Embed Straps 2nd Lift",1),
      T("Strap Layout 2nd Lift",1),
      T("Poured Wall Pour 2nd Lift",1),
      T("Deliver Trusses 2nd Lift",1),
      T("Deliver Lumber 2nd Lift",1),
      T("Set Floor Trusses 2nd Lift",1),
      T("Poured Wall Steel Install 3rd Lift",1),
      T("Extend Waste Pipes 3rd Lift",1),
      T("Poured Wall Steel Insp 3rd Lift",1),
      T("Poured Wall Forming 3rd Lift",1),
      T("Embed Straps 3rd Lift",1),
      T("Strap Layout 3rd Lift",1),
      T("Poured Wall Pour 3rd Lift",1),
      T("Del Block",1),
      T("Lay Block",1),
      T("Order Embed Straps",1),
      T("Strap Lay Out",1),
      T("Lintel Insp",1),
      T("Lintel Pour",1),
      T("Truss Del",1),
      T("Lumber Delivery",1),
      T("Metal Strap Delivery",1),
      T("Sch. Window Install",1),
    ]},
    { id:uid(), label:"Framing & Dry-In", color:"#3A7CB0", tasks:[
      T("Order Tile",1),
      T("Start Frame",1),
      T("Sch. Roof Dry In",1),
      T("Sch. 2nd floor torch down",1),
      T("Order Corbels",1),
      T("Roof Wall Sheeting Insp.",1),
      T("Sch. / Measure Ext Doors",1),
      T("Up Lift Insp",1),
      T("Window Install",1),
      T("Install Ext Doors",1),
      T("Window / Door Inspection",1),
      T("Confirm Trim Order",1),
      T("Schedule Plumb Pre Con",1),
      T("Schedule Electric Pre Con",1),
      T("Tub Set / Top Out Fixtures Y/N",1),
      T("HVAC Rough Hood Duct Size",1),
      T("Install Roof Metal and Vent Caps",1),
      T("Roof Dry In Insp",1),
      T("Wall Dry In Insp.",1),
      T("Exterior Siding Install",1),
      T("Shingle Roof Mat",1),
      T("Shingle Roof Install",1),
      T("Metal Roof Install",1),
    ]},
    { id:uid(), label:"Rough-Ins", color:"#4A7B6F", tasks:[
      T("Septic EHS Survey to Electrician if Aerobic System",1),
      T("Electric Rough",1),
      T("Kitchen RO Sink to Fridge Line",1),
      T("Low Voltage",1),
      T("Gas Piping Rough",1),
      T("Drywall Take Off",1),
      T("T&G Ceiling Ordered",1),
      T("Frame Walk",1),
      T("Frame Punch",1),
      T("Schedule Pool Install",1),
      T("Fire Caulk",1),
      T("Plumb Rough Insp",1),
      T("HVAC Rough Insp",1),
      T("Electric Rough Insp",1),
      T("Gas Rough Insp",1),
      T("Have water lines pressurized and tubs filled",1),
      T("Frame All Insp",1),
      T("Insulation Foam or Batt",1),
      T("Insulation Inspection",1),
      T("Notify Drywall Sub of Passed Insp",1),
    ]},
    { id:uid(), label:"Drywall & Wells", color:"#6B3FA0", tasks:[
      T("Drywall Walk with Sub",1),
      T("Deliver Drywall",1),
      T("Order Pavers",1),
      T("Hang Drywall",1),
      T("Drywall Screw Inspection",1),
      T("Install Potable Well",1),
      T("Install Irrigation Well",1),
      T("Lathe",1),
      T("Lathe Insp",1),
      T("Notify Stucco Sub of passed Inspection",1),
      T("Stucco",1),
      T("Stucco WIP Insp",1),
      T("Drywall Spray Date",1),
      T("Paint Prime Int",1),
      T("Measure California Closet / Pantry",1),
      T("Order Bahama Shutters",1),
    ]},
    { id:uid(), label:"Septic & Tile", color:"#8A7340", tasks:[
      T("Install Septic",1),
      T("Water Tie In Inspection",1),
      T("Sewer Tie In Insp",1),
      T("Cover Septic",1),
      T("Confirm Appliance Order",1),
      T("Tile Precon with Client",1),
      T("Deliver Tile",1),
      T("Install Floor Tile Drains Onsite Y/N",1),
      T("Install Wall Tile",1),
    ]},
    { id:uid(), label:"Interior Finishes", color:"#B04A4A", tasks:[
      T("Cabinet Install",1),
      T("Trim Del",1),
      T("Trim Labor",1),
      T("Interior Paint",1),
      T("Exterior Paint",1),
      T("Install California Closets/Pantry",1),
      T("Install Elec Meter Can",1),
      T("Notify FPL of Meter Elec Can Set",1),
      T("Order Stone Brick",1),
      T("Garage Door",1),
      T("T&G Ceiling Install",1),
      T("HVAC Trim",1),
      T("Soffit Facia",1),
      T("Install Foam Details",1),
      T("Blow Insulation",1),
      T("Top Install",1),
      T("Appliance Inspection",1),
      T("Plumb Trim",1),
      T("Shelving Enclosure Buyer Precon and Measure",1),
      T("Electric Trim / Generator",1),
      T("Early Power Insp",1),
    ]},
    { id:uid(), label:"Driveway & Hardscape", color:"#2B4C7E", tasks:[
      T("Driveway Pull",1),
      T("Culvert Set",1),
      T("Form Driveway",1),
      T("Run Irrigation Chase",1),
      T("Driveway Insp",1),
      T("Pour Drive",1),
      T("Deliver Pavers",1),
      T("Install Pavers",1),
      T("Install Stone",1),
      T("Gutter Install",1),
      T("Electric Meter Set",1),
      T("Electric Hot Check",1),
      T("AC Breaker Disconnect needed",1),
      T("Connect AC / Pump Whips",1),
      T("AC Start Up",1),
      T("Water Softener Install",1),
      T("RO Install",1),
      T("Water Start",1),
      T("Bac T Test",1),
      T("Blower Door Test",1),
      T("Mirrors Shelving Enclosure",1),
    ]},
    { id:uid(), label:"Pool, Outdoor & Landscape", color:"#2B7B5A", tasks:[
      T("Pool Deck Poured / Paved",1),
      T("Install Outdoor Kitchen",1),
      T("Stucco Outdoor Kitchen",1),
      T("Final Grade",1),
      T("Pre Sod Insp",1),
      T("Set Gas Tank",1),
      T("Irrigation",1),
      T("Landscape Installed",1),
      T("Sod Installed",1),
      T("Irrigation Bump",1),
      T("Septic Start",1),
      T("Septic Final",1),
      T("After pour Insp",1),
      T("Final Survey",1),
      T("FFE Certification",1),
      T("Asphaut Repair",1),
      T("Final Termite",1),
    ]},
    { id:uid(), label:"Close-Out & Punch", color:"#1A1A1A", tasks:[
      T("Rough Clean",1),
      T("Set Appliances",1),
      T("Gas Final",1),
      T("Carpet",1),
      T("California Closet / Pantry Install",1),
      T("Fireplace Trim",1),
      T("Stucco Bump",1),
      T("Trim Bump",1),
      T("Drywall Bump",1),
      T("Paint Bump",1),
      T("Plumbing Final Insp",1),
      T("HVAC Final Insp",1),
      T("Electric Final Insp",1),
      T("Cabinet Bump",1),
      T("Install Handle Set",1),
      T("Builder Punch",1),
      T("Install Mailbox",1),
      T("Install House Numbers",1),
      T("Screen Out",1),
      T("Final Clean",1),
      T("Exterior and Garage Clean",1),
      T("Pressure Wash",1),
      T("Zoning / Landscape Final",1),
      T("ROW Insp",1),
      T("Final Inspection",1),
    ]},
  ];
}

function blockWallPhases() {
  const T=(l)=>({id:uid(),label:l,duration:1,deps:[]});
  return [
    { id:uid(), label:"Pre-Construction & Permits", color:"#8A7340", tasks:[
      T("FPL Service Location"),
      T("Boundary Survey"),
      T("Clearing Survey"),
      T("Temp Toilet"),
      T("Lot Clear"),
      T("Silt Fence"),
      T("OrderTrusses"),
      T("Order Mailbox"),
      T("Confirm FFE w/Approved Engineer Survey"),
      T("Schedule Poured Walls"),
      T("Rough House Stake"),
      T("Dumpster"),
      T("Permit Plans to Lumber Supplier"),
      T("Water Meter Install"),
    ]},
    { id:uid(), label:"Pilings & Pad", color:"#B04A4A", tasks:[
      T("Piling Pad Elevation"),
      T("Piling Pad"),
      T("Piling Stake"),
      T("Piling Steel Delivered"),
      T("Piling Steel Install"),
      T("Piling Survey"),
      T("Piling Survey to FDEP"),
      T("Piling Inspection Engineer"),
      T("Pour Pilings"),
      T("Build House Pad"),
    ]},
    { id:uid(), label:"Foundation & Slab", color:"#2B4C7E", tasks:[
      T("Good House Stake"),
      T("Pad Compaction Test"),
      T("Footer Steel"),
      T("Pool Footer Required"),
      T("Dig Footers"),
      T("Footer UFER Ground"),
      T("Footer Insp"),
      T("Pour Footer"),
      T("Stemwall Material"),
      T("Stemwall Labor"),
      T("Form Boards"),
      T("Cabinet Layout Complete"),
      T("Measure Forms"),
      T("Form Check Survey"),
      T("Plumber / Pool mark Stemwall for penetrations"),
      T("Stemwall Insp"),
      T("Pour Stemwall"),
      T("Backfill Stemwall"),
      T("Water Softener Pre-pipe"),
      T("Underground Plumb"),
      T("Underground Plumb Insp"),
      T("Order Slab Pack"),
      T("Slab Prep"),
      T("Mono UFER Ground"),
      T("Floor Plug if App"),
      T("Slab Insp"),
      T("Pour Slab"),
      T("Foundation Survey as required"),
      T("Order Windows"),
      T("Grade Around"),
      T("Window ROs"),
      T("Exterior Door ROs"),
    ]},
    { id:uid(), label:"Block Walls (Lifts & Tie Beams)", color:"#3A7CB0", tasks:[
      T("Del Block"),
      T("Lay Block 1st Lift"),
      T("Extend Waste Pipes 1st Lift"),
      T("Embed Straps 1st Lift"),
      T("Strap Layout 1st Lift"),
      T("(Partial if Appl) Tie Beam 1st Lift Inspection"),
      T("Tie Beam Pour 1st Lift"),
      T("Deliver Trusses 1st Lift"),
      T("Deliver Lumber 1st Lift"),
      T("Set Floor Trusses 1st Lift"),
      T("Lay Block 2nd Lift"),
      T("Extend Waste Pipes 2nd Lift"),
      T("Embed Straps 2nd Lift"),
      T("Strap Layout 2nd Lift"),
      T("Partial Tie Beam 2nd Lift Inspection"),
      T("Tie Beam Pour 2nd Lift"),
      T("Deliver Trusses 2nd Lift"),
      T("Deliver Lumber 2nd Lift"),
      T("Set Floor Trusses 2nd Lift"),
      T("Lay Block 3rd Lift"),
      T("Extend Waste Pipes 3rd Lift"),
      T("Embed Straps 3rd Lift"),
      T("Strap Layout 3rd Lift"),
      T("Final Tie Beam Insp 3rd Lift"),
      T("Tie Beam Pour 3rd Lift"),
      T("Roof Truss Del"),
      T("Lumber Delivery"),
      T("Metal Strap Delivery"),
      T("Sch. Window Install"),
    ]},
    { id:uid(), label:"Framing & Dry-In", color:"#4A7B6F", tasks:[
      T("Order Tile"),
      T("Start Frame"),
      T("Sch. Roof Dry In"),
      T("Sch. 2nd floor torch down"),
      T("Order Corbels"),
      T("Roof Wall Sheeting Insp."),
      T("Sch. / Measure Ext Doors"),
      T("Up Lift Insp"),
      T("Window Install"),
      T("Install Ext Doors"),
      T("Window / Door Inspection"),
      T("Confirm Trim Order"),
      T("Schedule Plumb Pre Con"),
      T("Schedule Electric Pre Con"),
      T("Tub Set / Top Out Fixtures Y/N"),
      T("HVAC Rough Hood Duct Size"),
      T("Install Roof Metal and Vent Caps"),
      T("Roof Dry In Insp"),
      T("Wall Dry In Insp."),
      T("Exterior Siding Install"),
      T("Shingle Roof Mat"),
      T("Shingle Roof Install"),
      T("Metal Roof Install"),
    ]},
    { id:uid(), label:"Rough-Ins", color:"#6B3FA0", tasks:[
      T("Septic EHS Survey to Electrician if Aerobic System"),
      T("Electric Rough"),
      T("Kitchen RO Sink to Fridge Line"),
      T("Low Voltage"),
      T("Gas Piping Rough"),
      T("Drywall Take Off"),
      T("T&G Ceiling Ordered"),
      T("Frame Walk"),
      T("Frame Punch"),
      T("Schedule Pool Install"),
      T("Fire Caulk"),
      T("Plumb Rough Insp"),
      T("HVAC Rough Insp"),
      T("Electric Rough Insp"),
      T("Gas Rough Insp"),
      T("Have water lines pressurized and tubs filled"),
      T("Frame All Insp"),
      T("Insulation Foam or Batt"),
      T("Insulation Inspection"),
      T("Notify Drywall Sub of Passed Insp"),
    ]},
    { id:uid(), label:"Drywall, Wells & Stucco", color:"#8A7340", tasks:[
      T("Drywall Walk with Sub"),
      T("Deliver Drywall"),
      T("Order Pavers"),
      T("Hang Drywall"),
      T("Drywall Screw Inspection"),
      T("Install Potable Well"),
      T("Install Irrigation Well"),
      T("Lathe"),
      T("Lathe Insp"),
      T("Notify Stucco Sub of passed Inspection"),
      T("Stucco"),
      T("Stucco WIP Insp"),
      T("Drywall Spray Date"),
      T("Paint Prime Int"),
      T("Measure California Closet / Pantry"),
      T("Order Bahama Shutters"),
    ]},
    { id:uid(), label:"Septic & Tile", color:"#B04A4A", tasks:[
      T("Install Septic"),
      T("Water Tie In Inspection"),
      T("Sewer Tie In Insp"),
      T("Cover Septic"),
      T("Confirm Appliance Order"),
      T("Tile Precon with Client"),
      T("Deliver Tile"),
      T("Install Floor Tile Drains Onsite Y/N"),
      T("Install Wall Tile"),
    ]},
    { id:uid(), label:"Interior Finishes", color:"#2B4C7E", tasks:[
      T("Cabinet Install"),
      T("Trim Del"),
      T("Trim Labor"),
      T("Interior Paint"),
      T("Exterior Paint"),
      T("Install California Closets/Pantry"),
      T("Install Elec Meter Can"),
      T("Notify FPL of Meter Elec Can Set"),
      T("Order Stone Brick"),
      T("Garage Door"),
      T("T&G Ceiling Install"),
      T("HVAC Trim"),
      T("Soffit Facia"),
      T("Install Foam Details"),
      T("Blow Insulation"),
      T("Top Install"),
      T("Appliance Inspection"),
      T("Plumb Trim"),
      T("Shelving Enclosure Buyer Precon and Measure"),
      T("Electric Trim"),
      T("Early Power Insp"),
    ]},
    { id:uid(), label:"Driveway & Hardscape", color:"#3A7CB0", tasks:[
      T("Driveway Pull"),
      T("Culvert Set"),
      T("Form Driveway"),
      T("Run Irrigation Chase"),
      T("Driveway Insp"),
      T("Pour Drive"),
      T("Deliver Pavers"),
      T("Install Pavers"),
      T("Install Stone"),
      T("Gutter Install"),
      T("Electric Meter Set"),
      T("Electric Hot Check"),
      T("AC Breaker Disconnect needed"),
      T("Connect AC / Pump Whips"),
      T("AC Start Up"),
      T("Water Softener Install"),
      T("RO Install"),
      T("Water Start"),
      T("Bac T Test"),
      T("Blower Door Test"),
      T("Mirrors Shelving Enclosure"),
    ]},
    { id:uid(), label:"Pool, Outdoor & Landscape", color:"#2B7B5A", tasks:[
      T("Pool Deck Poured / Paved"),
      T("Install Outdoor Kitchen"),
      T("Stucco Outdoor Kitchen"),
      T("Final Grade"),
      T("Pre Sod Insp"),
      T("Set Gas Tank"),
      T("Irrigation"),
      T("Landscape Installed"),
      T("Sod Installed"),
      T("Irrigation Bump"),
      T("Septic Start"),
      T("Septic Final"),
      T("After pour Insp"),
      T("Final Survey"),
      T("FFE Certification"),
      T("Asphaut Repair"),
      T("Final Termite"),
    ]},
    { id:uid(), label:"Close-Out & Punch", color:"#1A1A1A", tasks:[
      T("Rough Clean"),
      T("Set Appliances"),
      T("Gas Final"),
      T("Carpet"),
      T("California Closet / Pantry Install"),
      T("Fireplace Trim"),
      T("Stucco Bump"),
      T("Trim Bump"),
      T("Drywall Bump"),
      T("Paint Bump"),
      T("Plumbing Final Insp"),
      T("HVAC Final Insp"),
      T("Electric Final Insp"),
      T("Cabinet Bump"),
      T("Install Handle Set"),
      T("Builder Punch"),
      T("Install Mailbox"),
      T("Install House Numbers"),
      T("Screen Out"),
      T("Final Clean"),
      T("Exterior and Garage Clean"),
      T("Pressure Wash"),
      T("Zoning / Landscape Final"),
      T("ROW Insp"),
      T("Final Inspection"),
    ]},
  ];
}

const DEFAULT_FOLDERS = ["Surveys","Permits","Contracts","Plans","Inspections","Photos"];
const mkFolder = (name) => ({id:uid(),name,files:[],folders:[]});

function blankMeta(phases) {
  const o = {statuses:{},notes:{},budgets:{},subs:{}};
  phases.forEach(p=>p.tasks.forEach(t=>{
    o.statuses[t.id]="Not Started"; o.notes[t.id]=""; o.budgets[t.id]={allocated:"",spent:""};
    o.subs[t.id]={subId:"",company:"",contact:"",phone:"",scheduledDate:"",completedDate:"",notes:""};
  }));
  // docs: tree of folders, each { id, name, files:[...], folders:[...] }
  o.docFolders = DEFAULT_FOLDERS.map(mkFolder);
  return o;
}

// ── Folder tree helpers (immutable updates by path of folder ids) ──────────────
function treeUpdate(folders, path, fn) {
  // path = array of folder ids leading to the target; fn(targetFolder)->newFolder
  if(path.length===0) return folders;
  const [head,...rest]=path;
  return folders.map(f=>{
    if(f.id!==head) return f;
    if(rest.length===0) return fn(f);
    return {...f, folders: treeUpdate(f.folders||[], rest, fn)};
  });
}
function treeGet(folders, path) {
  let cur=null, list=folders;
  for(const id of path){
    cur=(list||[]).find(f=>f.id===id);
    if(!cur) return null;
    list=cur.folders||[];
  }
  return cur;
}
// Flatten the tree into a list of {id, name, depth, path} for destination pickers
function flattenFolders(folders, path=[], depth=0, out=[]) {
  (folders||[]).forEach(f=>{
    const fpath=[...path,f.id];
    out.push({id:f.id,name:f.name,depth,path:fpath});
    flattenFolders(f.folders||[], fpath, depth+1, out);
  });
  return out;
}
// Is `maybeAncestorId` an ancestor of (or equal to) the folder at targetPath?
function pathContains(targetPath, id) { return targetPath.includes(id); }

function newProject(name,client,start,template) {
  const phases = template==="block" ? blockWallPhases() : pouredWallPhases();
  return { id:uid(), name:name||"New Project", client:client||"Client", start:start||TODAY, phases, totalBudget:"", ...blankMeta(phases) };
}

function buildSchedule(phases) {
  const r={};let d=0;
  phases.forEach(ph=>{let s=d;ph.tasks.forEach(t=>{r[t.id]={startDay:s,endDay:s+t.duration};s+=t.duration;});d=s;});
  return r;
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const P={
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  list:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  chart:"M18 20V10M12 20V4M6 20v-6",
  cal:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  dollar:"M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  folder:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  plus:"M12 5v14M5 12h14",
  edit:"M11 4H4a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  x:"M18 6L6 18M6 6l12 12",
  upload:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  file:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
  grip:"M9 5h2M9 12h2M9 19h2M13 5h2M13 12h2M13 19h2",
  check:"M20 6L9 17l-5-5",
  gear:"M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  up:"M18 15l-6-6-6 6",
  down:"M6 9l6 6 6-6",
  users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  phone:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  hard:"M3 17h18M12 3a9 9 0 019 9H3a9 9 0 019-9z M12 3v3",
  save:"M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8M7 3v5h8",
};
const Icon = ({name,size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {P[name]?.split("M").filter(Boolean).map((d,i)=><path key={i} d={"M"+d}/>)}
  </svg>
);

// ── SHARED UI ─────────────────────────────────────────────────────────────────
const S = {
  input: { width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:7,color:"#1A1A1A",padding:"7px 11px",fontSize:13,boxSizing:"border-box" },
  card:  { background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:11,boxShadow:"0 1px 3px rgba(0,0,0,0.04)" },
};

function Btn({children,onClick,icon,small,danger,primary,dim,style:sx={}}) {
  return (
    <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:5,padding:small?"3px 9px":"6px 13px",borderRadius:7,border:danger?"1px solid #EF4444":primary?"none":"1px solid #D6D2CA",background:primary?"#1A1A1A":danger?"#EF444415":dim?"transparent":"#F2F0EC",color:danger?"#DC2626":primary?"#fff":"#3A3A3A",cursor:"pointer",fontSize:small?10:12,fontWeight:600,...sx}}>
      {icon&&<Icon name={icon} size={small?10:13}/>}{children}
    </button>
  );
}
function Modal({title,onClose,children,width=420}) {
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300}}>
      <div style={{background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:14,padding:24,width,maxWidth:"95vw",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h3 style={{margin:0,fontSize:15,fontWeight:700}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#9A9A9A",cursor:"pointer"}}><Icon name="x" size={18}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({label,children}) {
  return <div style={{marginBottom:13}}><label style={{fontSize:10,color:"#6B6B6B",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</label>{children}</div>;
}
function Inp({value,onChange,placeholder,type="text"}) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={S.input}/>;
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const saved = useMemo(()=>loadSaved(),[]);
  const [projects,setProjects] = useState(()=>saved?.projects||[newProject("The Henderson Residence","Henderson Family",TODAY)]);
  const [activeId,setActiveId] = useState(()=>saved?.activeId||null);
  const [logoUrl,setLogoUrl]   = useState(()=>saved?.logoUrl||WALDEN_LOGO);
  // Logo can never be empty — always falls back to the built-in Walden logo
  const safeLogo = logoUrl || WALDEN_LOGO;
  const [directory,setDirectory] = useState(()=>saved?.directory||[]);
  const [view,setView]         = useState("dashboard");
  const [showNew,setShowNew]   = useState(false);
  const [newForm,setNewForm]   = useState({name:"",client:"",start:TODAY,template:"poured"});
  const [saveState,setSaveState] = useState("saved");
  const saveTimer = useRef(null);

  const pid = projects.find(p=>p.id===activeId)?activeId:projects[0]?.id;
  const project = projects.find(p=>p.id===pid)||projects[0];

  useEffect(()=>{
    setSaveState("saving");
    if(saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(()=>{ saveToDisk({projects,activeId:pid,logoUrl,directory}); setSaveState("saved"); },700);
    return ()=>clearTimeout(saveTimer.current);
  },[projects,pid,logoUrl,directory]);

  const upd = useCallback((id,fn)=>setProjects(ps=>ps.map(p=>p.id===id?(typeof fn==="function"?fn(p):{...p,...fn}):p)),[]);

  const mutate = useCallback((fn)=>upd(pid,p=>{
    const phases=fn(JSON.parse(JSON.stringify(p.phases)));
    const st={...p.statuses},no={...p.notes},bu={...p.budgets},su={...(p.subs||{})};
    phases.flatMap(ph=>ph.tasks).forEach(t=>{
      if(!(t.id in st)){st[t.id]="Not Started";no[t.id]="";bu[t.id]={allocated:"",spent:""};su[t.id]={subId:"",company:"",contact:"",phone:"",scheduledDate:"",completedDate:"",notes:""};}
    });
    return {...p,phases,statuses:st,notes:no,budgets:bu,subs:su};
  }),[pid,upd]);

  const addPhase=(l,c)=>mutate(ph=>[...ph,{id:uid(),label:l,color:c,tasks:[]}]);
  const editPhase=(id,l,c)=>mutate(ph=>ph.map(p=>p.id===id?{...p,label:l,color:c}:p));
  const delPhase=(id)=>mutate(ph=>ph.filter(p=>p.id!==id));
  const movePhase=(id,dir)=>mutate(ph=>{const i=ph.findIndex(p=>p.id===id),j=i+dir;if(j<0||j>=ph.length)return ph;const a=[...ph];[a[i],a[j]]=[a[j],a[i]];return a;});
  const addTask=(pid2,l,dur)=>mutate(ph=>ph.map(p=>p.id===pid2?{...p,tasks:[...p.tasks,{id:uid(),label:l,duration:Number(dur)||7,deps:[]}]}:p));
  const editTask=(pid2,tid,l,dur)=>mutate(ph=>ph.map(p=>p.id===pid2?{...p,tasks:p.tasks.map(t=>t.id===tid?{...t,label:l,duration:Number(dur)||1}:t)}:p));
  const delTask=(pid2,tid)=>mutate(ph=>ph.map(p=>p.id===pid2?{...p,tasks:p.tasks.filter(t=>t.id!==tid)}:p));
  const moveTask=(pid2,tid,dir)=>mutate(ph=>ph.map(p=>{if(p.id!==pid2)return p;const a=[...p.tasks],i=a.findIndex(t=>t.id===tid),j=i+dir;if(j<0||j>=a.length)return p;[a[i],a[j]]=[a[j],a[i]];return{...p,tasks:a};}));

  const set=(field,tid,val)=>upd(pid,p=>({...p,[field]:{...p[field],[tid]:val}}));
  const setFolders=(folders)=>upd(pid,p=>({...p,docFolders:folders}));

  const addProj=()=>{const p=newProject(newForm.name,newForm.client,newForm.start,newForm.template);setProjects(ps=>[...ps,p]);setActiveId(p.id);setShowNew(false);setNewForm({name:"",client:"",start:TODAY,template:"poured"});setView("dashboard");};
  const delProj=(id)=>{const r=projects.filter(p=>p.id!==id);setProjects(r);if(pid===id)setActiveId(r[0]?.id);};

  const sched=useMemo(()=>buildSchedule(project.phases),[project.phases]);
  const totalDays=Math.max(...Object.values(sched).map(s=>s.endDay),1);
  const allTasks=project.phases.flatMap(p=>p.tasks.map(t=>({...t,phaseColor:p.color,phaseLabel:p.label,phaseId:p.id})));
  const done=allTasks.filter(t=>project.statuses[t.id]==="Complete").length;
  const inProg=allTasks.filter(t=>project.statuses[t.id]==="In Progress").length;
  const blocked=allTasks.filter(t=>project.statuses[t.id]==="Blocked").length;
  const pct=allTasks.length?Math.round(done/allTasks.length*100):0;
  const totAlloc=allTasks.reduce((s,t)=>s+num(project.budgets[t.id]?.allocated),0);
  const totSpent=allTasks.reduce((s,t)=>s+num(project.budgets[t.id]?.spent),0);

  const NAV=[
    {id:"dashboard",icon:"home",label:"Dashboard"},
    {id:"schedule",icon:"gear",label:"Edit Schedule"},
    {id:"tasks",icon:"list",label:"Tasks"},
    {id:"subs",icon:"users",label:"Subcontractors"},
    {id:"budget",icon:"dollar",label:"Budget"},
    {id:"docs",icon:"folder",label:"Documents"},
    {id:"gantt",icon:"chart",label:"Gantt"},
    {id:"calendar",icon:"cal",label:"Calendar"},
  ];

  const exportData=()=>{
    const blob=new Blob([JSON.stringify({projects},null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`buildtrack-${TODAY}.json`;a.click();
  };
  const importRef=useRef();
  const importData=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.projects&&window.confirm(`Import ${d.projects.length} project(s)? This replaces current data.`)){setProjects(d.projects);setActiveId(d.projects[0]?.id);}}catch{alert("Invalid file.");}};
    r.readAsText(f);e.target.value="";
  };

  return (
    <div style={{height:"100vh",background:"#FFFFFF",color:"#1A1A1A",fontFamily:"'Inter',system-ui,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden"}}>

      {/* TOP BAR */}
      <header style={{background:"#FFFFFF",borderBottom:"1px solid #E5E2DC",padding:"0 16px",height:54,display:"flex",alignItems:"center",gap:12,flexShrink:0,zIndex:10,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
        <div style={{height:42,display:"flex",alignItems:"center",flexShrink:0}}>
          <img src={safeLogo} alt="Walden Custom Builders" style={{height:42,objectFit:"contain"}}/>
        </div>
        <div style={{width:1,height:20,background:"#E5E2DC",flexShrink:0}}/>
        {/* Active project name */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1A1A1A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{project.name}</div>
          <div style={{fontSize:10,color:"#6B6B6B"}}>{project.client}</div>
        </div>
        {/* Save indicator */}
        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:saveState==="saving"?"#F59E0B":"#22C55E",flexShrink:0}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:saveState==="saving"?"#F59E0B":"#22C55E"}}/>
          {saveState==="saving"?"Saving…":"Saved"}
        </div>
        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{textAlign:"right"}}><div style={{fontSize:9,color:"#6B6B6B"}}>Progress</div><div style={{fontWeight:800,fontSize:14,color:"#1A1A1A"}}>{pct}%</div></div>
          <div style={{width:50,height:5,background:"#E5E2DC",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"#1A1A1A",transition:"width 0.4s"}}/></div>
        </div>
      </header>

      {/* BODY: sidebar + content */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* LEFT SIDEBAR — project list */}
        <aside style={{width:220,flexShrink:0,background:"#F7F6F3",borderRight:"1px solid #E5E2DC",display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"12px 12px 8px",borderBottom:"1px solid #E5E2DC",flexShrink:0}}>
            <div style={{fontSize:9,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Projects ({projects.length})</div>
            <button onClick={()=>setShowNew(true)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"7px 0",background:"#1A1A1A",border:"none",borderRadius:7,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>
              <Icon name="plus" size={12}/> New Project
            </button>
          </div>

          {/* Scrollable project list */}
          <div style={{flex:1,overflowY:"auto",padding:"6px 8px"}}>
            {projects.length===0 && <div style={{fontSize:11,color:"#9A9A9A",padding:"12px 4px"}}>No projects yet.</div>}
            {projects.map(p=>{
              const pAllTasks=p.phases.flatMap(ph=>ph.tasks);
              const pDone=pAllTasks.filter(t=>p.statuses[t.id]==="Complete").length;
              const pPct=pAllTasks.length?Math.round(pDone/pAllTasks.length*100):0;
              const isActive=p.id===pid;
              const hasBlocked=pAllTasks.some(t=>p.statuses[t.id]==="Blocked");
              return (
                <button key={p.id} onClick={()=>{setActiveId(p.id);setView("dashboard");}}
                  style={{width:"100%",display:"block",textAlign:"left",padding:"9px 10px",marginBottom:3,borderRadius:8,border:`1px solid ${isActive?"#1A1A1A":"transparent"}`,background:isActive?"#1A1A1A18":"transparent",cursor:"pointer",transition:"all 0.15s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    {hasBlocked&&<div style={{width:6,height:6,borderRadius:"50%",background:"#EF4444",flexShrink:0}} title="Has blocked tasks"/>}
                    <span style={{fontSize:12,fontWeight:isActive?700:500,color:isActive?"#1A1A1A":"#6B6B6B",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{p.name}</span>
                    <span style={{fontSize:10,fontWeight:700,color:isActive?"#1A1A1A":"#9A9A9A",flexShrink:0}}>{pPct}%</span>
                  </div>
                  <div style={{fontSize:10,color:"#9A9A9A",marginBottom:5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.client}</div>
                  <div style={{height:3,background:"#E5E2DC",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pPct}%`,background:isActive?"#1A1A1A":"#4A7B6F",borderRadius:2,transition:"width 0.4s"}}/>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT: nav + content */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
          {/* NAV TABS */}
          <nav style={{background:"#FFFFFF",borderBottom:"1px solid #E5E2DC",display:"flex",padding:"0 10px",overflowX:"auto",flexShrink:0}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setView(n.id)}
                style={{display:"flex",alignItems:"center",gap:5,padding:"8px 11px",background:"transparent",border:"none",color:view===n.id?"#1A1A1A":"#6B6B6B",cursor:"pointer",fontSize:11,fontWeight:view===n.id?700:400,borderBottom:view===n.id?"2px solid #1A1A1A":"2px solid transparent",whiteSpace:"nowrap",flexShrink:0}}>
                <Icon name={n.icon} size={12}/>{n.label}
              </button>
            ))}
          </nav>

          {/* MAIN CONTENT */}
          <main style={{flex:1,overflowY:"auto",padding:18}}>
            {view==="dashboard" && <Dashboard project={project} upd={upd} sched={sched} totalDays={totalDays} done={done} inProg={inProg} blocked={blocked} pct={pct} totAlloc={totAlloc} totSpent={totSpent} projects={projects} delProj={delProj} allTasks={allTasks} exportData={exportData} importRef={importRef} logoUrl={logoUrl} setLogoUrl={setLogoUrl}/>}
            {view==="schedule"  && <SchedEditor project={project} addPhase={addPhase} editPhase={editPhase} delPhase={delPhase} movePhase={movePhase} addTask={addTask} editTask={editTask} delTask={delTask} moveTask={moveTask} sched={sched}/>}
            {view==="tasks"     && <Tasks project={project} sched={sched} set={set} allTasks={allTasks}/>}
            {view==="subs"      && <Subs project={project} set={set} allTasks={allTasks} directory={directory} setDirectory={setDirectory}/>}
            {view==="budget"    && <Budget project={project} upd={upd} set={set} allTasks={allTasks} totAlloc={totAlloc} totSpent={totSpent}/>}
            {view==="docs"      && <Docs project={project} setFolders={setFolders}/>}
            {view==="gantt"     && <GanttView project={project} sched={sched} totalDays={totalDays}/>}
            {view==="calendar"  && <CalView project={project} sched={sched}/>}
          </main>
        </div>
      </div>

      <input type="file" ref={importRef} accept=".json" style={{display:"none"}} onChange={importData}/>

      {showNew&&(
        <Modal title="New Project" onClose={()=>setShowNew(false)} width={370}>
          <Field label="Project Name"><Inp value={newForm.name} onChange={e=>setNewForm(f=>({...f,name:e.target.value}))} placeholder="e.g. The Johnson Residence"/></Field>
          <Field label="Client Name"><Inp value={newForm.client} onChange={e=>setNewForm(f=>({...f,client:e.target.value}))} placeholder="e.g. Johnson Family"/></Field>
          <Field label="Start Date"><Inp type="date" value={newForm.start} onChange={e=>setNewForm(f=>({...f,start:e.target.value}))}/></Field>
          <Field label="Schedule Template">
            <div style={{display:"flex",gap:8}}>
              {[["poured","Poured Wall"],["block","Block Wall"]].map(([val,lbl])=>(
                <button key={val} onClick={()=>setNewForm(f=>({...f,template:val}))}
                  style={{flex:1,padding:"10px 8px",borderRadius:8,border:`2px solid ${newForm.template===val?"#1A1A1A":"#D6D2CA"}`,background:newForm.template===val?"#1A1A1A":"#FFFFFF",color:newForm.template===val?"#fff":"#3A3A3A",cursor:"pointer",fontSize:13,fontWeight:700}}>
                  {lbl}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#9A9A9A",marginTop:6}}>
              {newForm.template==="poured"?"Poured concrete wall lifts with steel forming.":"Concrete block lifts with tie beam pours. Includes pilings & pad prep."}
            </div>
          </Field>
          <button onClick={addProj} style={{width:"100%",marginTop:8,padding:"10px 0",background:"#1A1A1A",border:"none",borderRadius:8,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            Create Project
          </button>
        </Modal>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({project,upd,sched,totalDays,done,inProg,blocked,pct,totAlloc,totSpent,projects,delProj,allTasks,exportData,importRef,logoUrl,setLogoUrl}) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({name:project.name,client:project.client,start:project.start,totalBudget:project.totalBudget||""});
  const logoRef=useRef();
  const endDate=new Date(project.start+"T00:00:00");endDate.setDate(endDate.getDate()+totalDays);
  const over=project.totalBudget&&totSpent>num(project.totalBudget);
  const bpct=project.totalBudget?Math.min(100,Math.round(totSpent/num(project.totalBudget)*100)):null;
  const phProg=project.phases.map(p=>{const d=p.tasks.filter(t=>project.statuses[t.id]==="Complete").length;return{...p,d,tot:p.tasks.length,pct:p.tasks.length?Math.round(d/p.tasks.length*100):0};});
  const save=()=>{upd(project.id,{name:form.name,client:form.client,start:form.start,totalBudget:form.totalBudget});setEditing(false);};
  const handleLogo=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setLogoUrl(ev.target.result);r.readAsDataURL(f);e.target.value="";};

  return (
    <div>
      {/* Project card */}
      <div style={{...S.card,padding:"15px 18px",marginBottom:18,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
        {editing?(
          <div style={{display:"flex",flexWrap:"wrap",gap:9,flex:1}}>
            {[["Project Name","name","text"],["Client","client","text"],["Start Date","start","date"],["Total Budget ($)","totalBudget","number"]].map(([l,k,t])=>(
              <div key={k}><div style={{fontSize:9,color:"#6B6B6B",marginBottom:2,textTransform:"uppercase"}}>{l}</div>
                <input type={t} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
                  style={{background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:6,color:"#1A1A1A",padding:"5px 9px",fontSize:12}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
              <Btn primary onClick={save}>Save</Btn>
              <Btn onClick={()=>setEditing(false)}>Cancel</Btn>
            </div>
          </div>
        ):(
          <>
            <div>
              <div style={{fontSize:17,fontWeight:800}}>{project.name}</div>
              <div style={{fontSize:12,color:"#6B6B6B",marginTop:2}}>{project.client} · Starts {new Date(project.start+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
              {project.totalBudget&&<div style={{fontSize:12,color:"#1A1A1A",marginTop:2}}>Budget: {fmt$(project.totalBudget)}</div>}
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <Btn icon="edit" onClick={()=>{setForm({name:project.name,client:project.client,start:project.start,totalBudget:project.totalBudget||""});setEditing(true);}}>Edit</Btn>
              {projects.length>1&&<Btn danger icon="trash" onClick={()=>window.confirm("Delete this project?")&&delProj(project.id)}>Delete</Btn>}
              <input type="file" ref={logoRef} accept="image/*" style={{display:"none"}} onChange={handleLogo}/>
              <Btn icon="upload" onClick={()=>logoRef.current?.click()}>Change Logo</Btn>
              <Btn icon="save" onClick={exportData}>Backup</Btn>
              <Btn onClick={()=>importRef.current?.click()}>Restore</Btn>
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:11,marginBottom:18}}>
        {[
          {label:"Est. Completion",value:endDate.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),sub:`${totalDays} days`,color:"#1A1A1A"},
          {label:"Complete",value:done,sub:`of ${allTasks.length} tasks`,color:"#22C55E"},
          {label:"In Progress",value:inProg,sub:"active",color:"#F59E0B"},
          {label:"Blocked",value:blocked,sub:"need attention",color:"#EF4444"},
          {label:"Budget Spent",value:fmt$(totSpent),sub:`of ${fmt$(totAlloc)} alloc.`,color:over?"#EF4444":"#4A7B6F"},
        ].map(s=>(
          <div key={s.label} style={{...S.card,padding:"12px 15px",border:`1px solid ${s.color}33`}}>
            <div style={{fontSize:10,color:"#6B6B6B",marginBottom:3}}>{s.label}</div>
            <div style={{fontSize:20,fontWeight:800,color:s.color}}>{s.value}</div>
            <div style={{fontSize:10,color:"#9A9A9A",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {project.totalBudget&&(
        <div style={{...S.card,padding:"13px 17px",marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,fontWeight:600}}>Budget Overview</span>
            <span style={{fontSize:12,color:over?"#EF4444":"#6B6B6B"}}>{fmt$(totSpent)} / {fmt$(project.totalBudget)}</span>
          </div>
          <div style={{height:6,background:"#E5E2DC",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${bpct}%`,background:over?"#EF4444":"linear-gradient(90deg,#4A7B6F,#22C55E)",transition:"width 0.4s"}}/>
          </div>
          <div style={{fontSize:10,color:"#9A9A9A",marginTop:4}}>{bpct}% used</div>
        </div>
      )}

      <div style={{fontSize:10,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Phase Progress</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10}}>
        {phProg.map(p=>(
          <div key={p.id} style={{...S.card,padding:"12px 15px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,fontWeight:700,color:p.color}}>{p.label}</span>
              <span style={{fontSize:12,fontWeight:700}}>{p.pct}%</span>
            </div>
            <div style={{height:4,background:"#E5E2DC",borderRadius:3,overflow:"hidden",marginBottom:6}}>
              <div style={{height:"100%",width:`${p.pct}%`,background:p.color,transition:"width 0.4s"}}/>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:4}}>
              {p.tasks.map(t=><div key={t.id} style={{width:8,height:8,borderRadius:"50%",background:STATUS_COLORS[project.statuses[t.id]]}} title={t.label}/>)}
            </div>
            <div style={{fontSize:10,color:"#9A9A9A"}}>{p.d}/{p.tot} complete</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCHEDULE EDITOR ───────────────────────────────────────────────────────────
function SchedEditor({project,addPhase,editPhase,delPhase,movePhase,addTask,editTask,delTask,moveTask,sched}) {
  const [phModal,setPhModal]=useState(null);
  const [tModal,setTModal]=useState(null);
  const [phForm,setPhForm]=useState({label:"",color:PHASE_COLORS[0]});
  const [tForm,setTForm]=useState({label:"",duration:"7"});

  const openNewPh=()=>{setPhForm({label:"",color:PHASE_COLORS[project.phases.length%PHASE_COLORS.length]});setPhModal("new");};
  const openEditPh=p=>{setPhForm({label:p.label,color:p.color});setPhModal(p.id);};
  const openNewT=pid=>{setTForm({label:"",duration:"7"});setTModal({pid,mode:"new"});};
  const openEditT=(pid,t)=>{setTForm({label:t.label,duration:String(t.duration)});setTModal({pid,mode:"edit",t});};

  const savePh=()=>{if(!phForm.label.trim())return;phModal==="new"?addPhase(phForm.label.trim(),phForm.color):editPhase(phModal,phForm.label.trim(),phForm.color);setPhModal(null);};
  const saveT=()=>{if(!tForm.label.trim())return;tModal.mode==="new"?addTask(tModal.pid,tForm.label.trim(),tForm.duration):editTask(tModal.pid,tModal.t.id,tForm.label.trim(),tForm.duration);setTModal(null);};

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700}}>Edit Schedule</h2>
        <span style={{fontSize:12,color:"#9A9A9A"}}>Add, rename, reorder or delete phases and tasks</span>
        <Btn primary icon="plus" onClick={openNewPh} sx={{marginLeft:"auto"}}>Add Phase</Btn>
      </div>

      {project.phases.length===0&&<div style={{textAlign:"center",padding:60,color:"#9A9A9A"}}>No phases yet — click Add Phase to start.</div>}

      {project.phases.map((phase,pi)=>(
        <div key={phase.id} style={{marginBottom:18}}>
          <div style={{...S.card,border:`1px solid ${phase.color}44`,overflow:"hidden"}}>
            {/* Phase header */}
            <div style={{display:"flex",alignItems:"center",gap:9,padding:"10px 14px",background:`${phase.color}18`}}>
              <div style={{width:3,height:18,background:phase.color,borderRadius:2,flexShrink:0}}/>
              <span style={{fontWeight:700,fontSize:13,color:phase.color,flex:1}}>{phase.label}</span>
              <span style={{fontSize:10,color:"#9A9A9A"}}>{phase.tasks.length} tasks · {phase.tasks.reduce((s,t)=>s+t.duration,0)}d</span>
              <button onClick={()=>movePhase(phase.id,-1)} disabled={pi===0} style={{background:"none",border:"none",color:pi===0?"#D6D2CA":"#9A9A9A",cursor:pi===0?"default":"pointer",padding:2}}><Icon name="up" size={13}/></button>
              <button onClick={()=>movePhase(phase.id,1)}  disabled={pi===project.phases.length-1} style={{background:"none",border:"none",color:pi===project.phases.length-1?"#D6D2CA":"#9A9A9A",cursor:pi===project.phases.length-1?"default":"pointer",padding:2}}><Icon name="down" size={13}/></button>
              <Btn small icon="edit" onClick={()=>openEditPh(phase)}>Edit</Btn>
              <Btn small danger icon="trash" onClick={()=>window.confirm(`Delete "${phase.label}" and all its tasks?`)&&delPhase(phase.id)}>Delete</Btn>
            </div>
            {/* Tasks */}
            {phase.tasks.map((task,ti)=>{
              const s=sched[task.id];
              return (
                <div key={task.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderTop:"1px solid #E5E2DC",background:ti%2===1?"#FFFFFF33":"transparent"}}>
                  <Icon name="grip" size={12}/>
                  <span style={{flex:1,fontSize:12,color:"#1A1A1A"}}>{task.label}</span>
                  <span style={{fontSize:10,color:"#9A9A9A",minWidth:55}}>{task.duration}d</span>
                  <span style={{fontSize:10,color:"#9A9A9A",minWidth:80,textAlign:"right"}}>Day {s?.startDay}–{s?.endDay}</span>
                  <button onClick={()=>moveTask(phase.id,task.id,-1)} disabled={ti===0} style={{background:"none",border:"none",color:ti===0?"#D6D2CA":"#9A9A9A",cursor:ti===0?"default":"pointer",padding:2}}><Icon name="up" size={12}/></button>
                  <button onClick={()=>moveTask(phase.id,task.id,1)}  disabled={ti===phase.tasks.length-1} style={{background:"none",border:"none",color:ti===phase.tasks.length-1?"#D6D2CA":"#9A9A9A",cursor:ti===phase.tasks.length-1?"default":"pointer",padding:2}}><Icon name="down" size={12}/></button>
                  <Btn small icon="edit" onClick={()=>openEditT(phase.id,task)}>Edit</Btn>
                  <Btn small danger icon="trash" onClick={()=>window.confirm(`Delete "${task.label}"?`)&&delTask(phase.id,task.id)}>Del</Btn>
                </div>
              );
            })}
            {/* Add task */}
            <div style={{padding:"8px 14px",borderTop:"1px solid #E5E2DC"}}>
              <Btn small icon="plus" onClick={()=>openNewT(phase.id)} sx={{color:phase.color,borderColor:phase.color+"55"}}>Add Task</Btn>
            </div>
          </div>
        </div>
      ))}

      {phModal!==null&&(
        <Modal title={phModal==="new"?"Add Phase":"Edit Phase"} onClose={()=>setPhModal(null)}>
          <Field label="Phase Name"><Inp value={phForm.label} onChange={e=>setPhForm(f=>({...f,label:e.target.value}))} placeholder="e.g. Landscaping"/></Field>
          <Field label="Color">
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {PHASE_COLORS.map(c=><button key={c} onClick={()=>setPhForm(f=>({...f,color:c}))} style={{width:26,height:26,borderRadius:6,background:c,border:`3px solid ${phForm.color===c?"#fff":"transparent"}`,cursor:"pointer"}}/>)}
            </div>
          </Field>
          <div style={{display:"flex",gap:7,marginTop:4}}>
            <Btn primary onClick={savePh}>{phModal==="new"?"Add Phase":"Save"}</Btn>
            <Btn onClick={()=>setPhModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {tModal&&(
        <Modal title={tModal.mode==="new"?"Add Task":"Edit Task"} onClose={()=>setTModal(null)}>
          <Field label="Task Name"><Inp value={tForm.label} onChange={e=>setTForm(f=>({...f,label:e.target.value}))} placeholder="e.g. Install Windows"/></Field>
          <Field label="Duration (days)"><Inp type="number" value={tForm.duration} onChange={e=>setTForm(f=>({...f,duration:e.target.value}))} placeholder="7"/></Field>
          <div style={{fontSize:11,color:"#9A9A9A",marginBottom:12}}>Tasks run sequentially within a phase.</div>
          <div style={{display:"flex",gap:7}}>
            <Btn primary onClick={saveT}>{tModal.mode==="new"?"Add Task":"Save"}</Btn>
            <Btn onClick={()=>setTModal(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
function Tasks({project,sched,set,allTasks}) {
  const [open,setOpen]=useState(null);
  const [filter,setFilter]=useState("All");
  const subs=project.subs||{};

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:15,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700}}>Task Tracker</h2>
        <div style={{display:"flex",gap:4,marginLeft:"auto",flexWrap:"wrap"}}>
          {["All",...STATUS_OPTIONS].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${filter===s?(STATUS_COLORS[s]||"#1A1A1A"):"#E5E2DC"}`,background:filter===s?(STATUS_COLORS[s]||"#1A1A1A")+"22":"transparent",color:filter===s?(STATUS_COLORS[s]||"#1A1A1A"):"#6B6B6B",cursor:"pointer",fontSize:10}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {allTasks.length===0&&<div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:13}}>No tasks yet — go to <b>Edit Schedule</b> to add some.</div>}

      {project.phases.map(phase=>{
        const vis=filter==="All"?phase.tasks:phase.tasks.filter(t=>project.statuses[t.id]===filter);
        if(!vis.length)return null;
        return (
          <div key={phase.id} style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{width:3,height:14,background:phase.color,borderRadius:2}}/>
              <span style={{fontSize:10,fontWeight:700,color:phase.color,textTransform:"uppercase",letterSpacing:"0.08em"}}>{phase.label}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {vis.map(task=>{
                const s=sched[task.id],isOpen=open===task.id,sc=STATUS_COLORS[project.statuses[task.id]];
                const sub=subs[task.id]||{};
                const sd=s?new Date(project.start+"T00:00:00"):null;
                if(sd)sd.setDate(sd.getDate()+(s?.startDay||0));
                const ed=s?new Date(project.start+"T00:00:00"):null;
                if(ed)ed.setDate(ed.getDate()+(s?.endDay||0));
                return (
                  <div key={task.id} style={{...S.card,border:`1px solid ${isOpen?phase.color+"55":"#E5E2DC"}`,overflow:"hidden"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",cursor:"pointer"}} onClick={()=>setOpen(isOpen?null:task.id)}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:sc,flexShrink:0}}/>
                      <span style={{flex:1,fontSize:12,fontWeight:600}}>{task.label}</span>
                      {sub.company&&<span style={{fontSize:10,color:"#4A7B6F",background:"#4A7B6F22",borderRadius:4,padding:"1px 6px"}}>{sub.company}</span>}
                      {sub.scheduledDate&&!sub.completedDate&&<span style={{fontSize:10,color:"#1A1A1A"}}>{new Date(sub.scheduledDate+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
                      {sub.completedDate&&<span style={{fontSize:10,color:"#22C55E",display:"flex",alignItems:"center",gap:3}}><Icon name="check" size={10}/>Done</span>}
                      <select value={project.statuses[task.id]} onChange={e=>{e.stopPropagation();set("statuses",task.id,e.target.value);}} onClick={e=>e.stopPropagation()}
                        style={{background:sc+"22",border:`1px solid ${sc}`,borderRadius:5,color:sc,padding:"2px 5px",fontSize:10,cursor:"pointer"}}>
                        {STATUS_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                      <span style={{color:"#9A9A9A",fontSize:10}}>{isOpen?"▲":"▼"}</span>
                    </div>
                    {isOpen&&(
                      <div style={{padding:"0 12px 12px",borderTop:"1px solid #E5E2DC"}}>
                        {/* Subcontractor section */}
                        <div style={{background:"#FFFFFF",borderRadius:8,padding:"10px 12px",marginTop:10,border:"1px solid #E5E2DC"}}>
                          <div style={{fontSize:9,fontWeight:700,color:"#1A1A1A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,display:"flex",alignItems:"center",gap:4}}>
                            <Icon name="hard" size={10}/> Subcontractor
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                            {[["company","Company","text","e.g. Advanced Plumbing"],["contact","Contact","text","e.g. Mike Johnson"],["phone","Phone","tel","(555) 000-0000"],["scheduledDate","Scheduled Date","date",""]].map(([k,l,t,ph])=>(
                              <div key={k}>
                                <div style={{fontSize:9,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>{l}</div>
                                <input type={t} value={sub[k]||""} placeholder={ph}
                                  onChange={e=>{const v=e.target.value;set("subs",task.id,{...sub,[k]:v});if(k==="scheduledDate"&&v&&project.statuses[task.id]==="Not Started")set("statuses",task.id,"In Progress");}}
                                  style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                              </div>
                            ))}
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:7}}>
                            <div>
                              <div style={{fontSize:9,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Date Completed</div>
                              <input type="date" value={sub.completedDate||""}
                                onChange={e=>{set("subs",task.id,{...sub,completedDate:e.target.value});if(e.target.value)set("statuses",task.id,"Complete");}}
                                style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                            </div>
                            <div>
                              <div style={{fontSize:9,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Sub Notes</div>
                              <input value={sub.notes||""} placeholder="License #, access info..." onChange={e=>set("subs",task.id,{...sub,notes:e.target.value})}
                                style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                            </div>
                          </div>
                          {!sub.completedDate&&sub.company&&(
                            <button onClick={()=>{set("subs",task.id,{...sub,completedDate:TODAY});set("statuses",task.id,"Complete");}}
                              style={{marginTop:8,padding:"5px 12px",background:"#22C55E22",border:"1px solid #22C55E",borderRadius:6,color:"#22C55E",cursor:"pointer",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                              <Icon name="check" size={12}/> Mark Complete Today
                            </button>
                          )}
                        </div>
                        {/* Notes & budget */}
                        <div style={{marginTop:8}}>
                          <div style={{fontSize:9,color:"#6B6B6B",marginBottom:3,textTransform:"uppercase"}}>Notes</div>
                          <textarea value={project.notes[task.id]||""} onChange={e=>set("notes",task.id,e.target.value)} placeholder="Notes, decisions..." rows={2}
                            style={{width:"100%",background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:5,color:"#1A1A1A",padding:"5px 8px",fontSize:11,resize:"vertical",boxSizing:"border-box"}}/>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:7}}>
                          {["allocated","spent"].map(k=>(
                            <div key={k}>
                              <div style={{fontSize:9,color:"#6B6B6B",marginBottom:2,textTransform:"uppercase"}}>{k==="allocated"?"Allocated ($)":"Spent ($)"}</div>
                              <input type="number" value={project.budgets[task.id]?.[k]||""} placeholder="0"
                                onChange={e=>set("budgets",task.id,{...project.budgets[task.id],[k]:e.target.value})}
                                style={{width:"100%",background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── SUBCONTRACTORS ────────────────────────────────────────────────────────────
const TRADES = ["Plumbing","Electrical","HVAC","Grading","Clearing","Framing","Concrete","Roofing","Drywall","Stucco","Paint","Cabinets","Trim","Flooring","Tile","Septic","Well","Pool","Landscape","Irrigation","Survey","Inspection","Gas","Low Voltage","Garage Door","Gutters","Pavers","Other"];

function Subs({project,set,allTasks,directory,setDirectory}) {
  const [tab,setTab]=useState("assign"); // "assign" | "directory"
  const [filter,setFilter]=useState("all");
  const [editSub,setEditSub]=useState(null); // directory entry being added/edited
  const [assignFor,setAssignFor]=useState(null); // task id we're assigning a sub to
  const todayD=new Date();todayD.setHours(0,0,0,0);
  const subs=project.subs||{};

  const dirById=Object.fromEntries((directory||[]).map(d=>[d.id,d]));

  const fmtD=d=>d?new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}):"—";
  const until=d=>{
    if(!d)return null;
    const diff=Math.round((new Date(d+"T00:00:00")-todayD)/86400000);
    if(diff<0)return{label:`${Math.abs(diff)}d overdue`,color:"#EF4444"};
    if(diff===0)return{label:"Today",color:"#F59E0B"};
    if(diff===1)return{label:"Tomorrow",color:"#F59E0B"};
    if(diff<=7)return{label:`In ${diff} days`,color:"#1A1A1A"};
    return{label:`In ${diff} days`,color:"#9A9A9A"};
  };
  // Resolve a task's assigned company info from directory (subId) or legacy fields
  const subInfo=(s)=>{
    if(s.subId&&dirById[s.subId]) return dirById[s.subId];
    if(s.company) return {company:s.company,contact:s.contact,phone:s.phone};
    return null;
  };

  // ── DIRECTORY TAB ──
  const saveSub=()=>{
    if(!editSub.company.trim())return;
    if(editSub.id){ setDirectory(directory.map(d=>d.id===editSub.id?editSub:d)); }
    else { setDirectory([...(directory||[]),{...editSub,id:uid()}]); }
    setEditSub(null);
  };
  const delSub=(id)=>{ if(window.confirm("Remove this subcontractor from your directory?")) setDirectory(directory.filter(d=>d.id!==id)); };

  // group directory by trade
  const byTrade={};
  (directory||[]).forEach(d=>{ const t=d.trade||"Other"; (byTrade[t]=byTrade[t]||[]).push(d); });
  const tradeOrder=Object.keys(byTrade).sort();

  // ── ASSIGN TAB data ──
  const tagged=allTasks.map(t=>({...t,sub:subs[t.id]||{},status:project.statuses[t.id]}));
  const filt=tagged.filter(t=>{
    const info=subInfo(t.sub);
    if(filter==="upcoming")  return t.sub.scheduledDate&&!t.sub.completedDate;
    if(filter==="completed") return !!t.sub.completedDate;
    if(filter==="unassigned")return !info;
    return true;
  }).sort((a,b)=>{
    if(a.sub.completedDate&&!b.sub.completedDate)return 1;
    if(!a.sub.completedDate&&b.sub.completedDate)return -1;
    if(a.sub.scheduledDate&&b.sub.scheduledDate)return new Date(a.sub.scheduledDate)-new Date(b.sub.scheduledDate);
    if(a.sub.scheduledDate)return -1;if(b.sub.scheduledDate)return 1;return 0;
  });
  const upcoming=tagged.filter(t=>t.sub.scheduledDate&&!t.sub.completedDate).length;
  const comp=tagged.filter(t=>t.sub.completedDate).length;
  const unassigned=tagged.filter(t=>!subInfo(t.sub)).length;

  const assignSub=(taskId,subId)=>{ const s=subs[taskId]||{}; set("subs",taskId,{...s,subId}); setAssignFor(null); };

  return (
    <div>
      {/* Header + tab toggle */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700}}>Subcontractors</h2>
        <div style={{display:"flex",gap:0,border:"1px solid #D6D2CA",borderRadius:8,overflow:"hidden"}}>
          {[["assign","Assignments"],["directory","Directory"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{padding:"6px 14px",border:"none",background:tab===id?"#1A1A1A":"#FFFFFF",color:tab===id?"#fff":"#6B6B6B",cursor:"pointer",fontSize:12,fontWeight:700}}>{lbl}</button>
          ))}
        </div>
        {tab==="directory"&&<Btn primary icon="plus" onClick={()=>setEditSub({company:"",trade:"Plumbing",contact:"",phone:"",email:"",notes:""})} style={{marginLeft:"auto"}}>Add Subcontractor</Btn>}
      </div>

      {/* ===================== DIRECTORY TAB ===================== */}
      {tab==="directory"&&(
        <div>
          {(directory||[]).length===0&&(
            <div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:13}}>
              No subcontractors yet. Click <b>Add Subcontractor</b> to build your master list — e.g. your three plumbers, your grading companies, etc.
            </div>
          )}
          {tradeOrder.map(trade=>(
            <div key={trade} style={{marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,color:"#1A1A1A",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>{trade} <span style={{color:"#9A9A9A"}}>({byTrade[trade].length})</span></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
                {byTrade[trade].map(d=>(
                  <div key={d.id} style={{...S.card,padding:"13px 15px"}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                      <Icon name="hard" size={15}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:700}}>{d.company}</div>
                        {d.contact&&<div style={{fontSize:11,color:"#6B6B6B",marginTop:1}}>{d.contact}</div>}
                        {d.phone&&<div style={{fontSize:11,color:"#4A7B6F",marginTop:3}}><a href={`tel:${d.phone}`} style={{color:"#4A7B6F",textDecoration:"none"}}>{d.phone}</a></div>}
                        {d.email&&<div style={{fontSize:10,color:"#9A9A9A",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.email}</div>}
                        {d.notes&&<div style={{fontSize:10,color:"#9A9A9A",marginTop:4,fontStyle:"italic"}}>{d.notes}</div>}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:10,marginTop:10}}>
                      <button onClick={()=>setEditSub(d)} style={{fontSize:10,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",padding:0}}>Edit</button>
                      <button onClick={()=>delSub(d.id)} style={{fontSize:10,color:"#DC2626",background:"none",border:"none",cursor:"pointer",padding:0}}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================== ASSIGNMENTS TAB ===================== */}
      {tab==="assign"&&(
        <div>
          <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
            {[["all","All",null],["upcoming","Upcoming","#F59E0B"],["completed","Completed","#22C55E"],["unassigned","Unassigned","#6B6B6B"]].map(([id,lbl,c])=>(
              <button key={id} onClick={()=>setFilter(id)}
                style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${filter===id?(c||"#1A1A1A"):"#E5E2DC"}`,background:filter===id?(c||"#1A1A1A")+"22":"transparent",color:filter===id?(c||"#1A1A1A"):"#6B6B6B",cursor:"pointer",fontSize:10}}>{lbl}</button>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:18}}>
            {[{label:"Upcoming",value:upcoming,color:"#F59E0B"},{label:"Completed",value:comp,color:"#22C55E"},{label:"Unassigned",value:unassigned,color:"#6B6B6B"},{label:"Total Tasks",value:allTasks.length,color:"#1A1A1A"}].map(s=>(
              <div key={s.label} style={{...S.card,padding:"11px 14px",border:`1px solid ${s.color}33`}}>
                <div style={{fontSize:10,color:"#6B6B6B",marginBottom:2}}>{s.label}</div>
                <div style={{fontSize:20,fontWeight:800,color:s.color}}>{s.value}</div>
              </div>
            ))}
          </div>

          {filt.length===0&&<div style={{textAlign:"center",padding:40,color:"#9A9A9A",fontSize:12}}>No tasks match this filter.</div>}

          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {filt.map(t=>{
              const sub=t.sub,isComp=!!sub.completedDate;
              const info=subInfo(sub);
              const u=until(sub.scheduledDate);
              const overdue=sub.scheduledDate&&!isComp&&new Date(sub.scheduledDate+"T00:00:00")<todayD;
              return (
                <div key={t.id} style={{...S.card,border:`1px solid ${isComp?"#22C55E33":overdue?"#EF444444":sub.scheduledDate?"#1A1A1A33":"#E5E2DC"}`,overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,padding:"11px 14px",flexWrap:"wrap"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:STATUS_COLORS[t.status],flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600}}>{t.label}</div>
                      <div style={{fontSize:10,color:t.phaseColor,marginTop:1}}>{t.phaseLabel}</div>
                    </div>
                    {info?(
                      <div style={{display:"flex",alignItems:"center",gap:6,background:"#FFFFFF",borderRadius:7,padding:"5px 9px",border:"1px solid #D6D2CA"}}>
                        <Icon name="hard" size={11}/>
                        <div>
                          <div style={{fontSize:11,fontWeight:700}}>{info.company}</div>
                          {info.contact&&<div style={{fontSize:9,color:"#6B6B6B"}}>{info.contact}</div>}
                        </div>
                        {info.phone&&<a href={`tel:${info.phone}`} style={{color:"#4A7B6F",marginLeft:3}} title={info.phone}><Icon name="phone" size={12}/></a>}
                        <button onClick={()=>setAssignFor(t.id)} style={{fontSize:9,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",marginLeft:4}}>change</button>
                      </div>
                    ):(
                      <button onClick={()=>setAssignFor(t.id)} style={{fontSize:11,fontWeight:600,color:"#1A1A1A",background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:7,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                        <Icon name="plus" size={11}/> Assign Sub
                      </button>
                    )}
                    {isComp?(
                      <div style={{display:"flex",alignItems:"center",gap:4,background:"#22C55E22",border:"1px solid #22C55E",borderRadius:20,padding:"3px 9px",fontSize:10,fontWeight:700,color:"#22C55E"}}>
                        <Icon name="check" size={10}/> Done {fmtD(sub.completedDate)}
                      </div>
                    ):sub.scheduledDate?(
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:11,fontWeight:600}}>{fmtD(sub.scheduledDate)}</div>
                        {u&&<div style={{fontSize:10,fontWeight:700,color:overdue?"#EF4444":u.color}}>{overdue?`Overdue`:u.label}</div>}
                      </div>
                    ):null}
                  </div>
                  <div style={{padding:"0 14px 12px",borderTop:"1px solid #E5E2DC"}}>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:7,marginTop:10}}>
                      <div>
                        <div style={{fontSize:9,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Scheduled Date</div>
                        <input type="date" value={sub.scheduledDate||""}
                          onChange={e=>{const v=e.target.value;set("subs",t.id,{...sub,scheduledDate:v});if(v&&project.statuses[t.id]==="Not Started")set("statuses",t.id,"In Progress");}}
                          style={{width:"100%",background:"#FFFFFF",border:`1px solid ${overdue?"#EF4444":"#D6D2CA"}`,borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                      </div>
                      <div>
                        <div style={{fontSize:9,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Date Completed</div>
                        <input type="date" value={sub.completedDate||""}
                          onChange={e=>{const v=e.target.value;set("subs",t.id,{...sub,completedDate:v});if(v)set("statuses",t.id,"Complete");}}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                      </div>
                      <div>
                        <div style={{fontSize:9,color:"#9A9A9A",marginBottom:2,textTransform:"uppercase"}}>Job Notes</div>
                        <input value={sub.notes||""} placeholder="Scope, access, reminders..." onChange={e=>set("subs",t.id,{...sub,notes:e.target.value})}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:5,color:"#1A1A1A",padding:"4px 8px",fontSize:11,boxSizing:"border-box"}}/>
                      </div>
                    </div>
                    {!isComp&&info&&(
                      <button onClick={()=>{set("subs",t.id,{...sub,completedDate:TODAY});set("statuses",t.id,"Complete");}}
                        style={{marginTop:9,padding:"5px 12px",background:"#22C55E22",border:"1px solid #22C55E",borderRadius:6,color:"#22C55E",cursor:"pointer",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                        <Icon name="check" size={12}/> Mark Complete Today
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADD/EDIT SUB MODAL */}
      {editSub&&(
        <Modal title={editSub.id?"Edit Subcontractor":"Add Subcontractor"} onClose={()=>setEditSub(null)}>
          <Field label="Company Name"><Inp value={editSub.company} onChange={e=>setEditSub(s=>({...s,company:e.target.value}))} placeholder="e.g. Advanced Plumbing"/></Field>
          <Field label="Trade">
            <select value={editSub.trade} onChange={e=>setEditSub(s=>({...s,trade:e.target.value}))} style={{...S.input}}>
              {TRADES.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Contact Person"><Inp value={editSub.contact} onChange={e=>setEditSub(s=>({...s,contact:e.target.value}))} placeholder="e.g. Mike Johnson"/></Field>
          <Field label="Phone"><Inp type="tel" value={editSub.phone} onChange={e=>setEditSub(s=>({...s,phone:e.target.value}))} placeholder="(555) 000-0000"/></Field>
          <Field label="Email"><Inp value={editSub.email} onChange={e=>setEditSub(s=>({...s,email:e.target.value}))} placeholder="office@company.com"/></Field>
          <Field label="Notes"><Inp value={editSub.notes} onChange={e=>setEditSub(s=>({...s,notes:e.target.value}))} placeholder="License #, pricing, preferred, etc."/></Field>
          <div style={{display:"flex",gap:8,marginTop:4}}>
            <Btn primary onClick={saveSub}>{editSub.id?"Save Changes":"Add to Directory"}</Btn>
            <Btn onClick={()=>setEditSub(null)}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {/* ASSIGN PICKER MODAL */}
      {assignFor&&(
        <Modal title="Assign Subcontractor" onClose={()=>setAssignFor(null)}>
          <div style={{fontSize:11,color:"#6B6B6B",marginBottom:12}}>
            Pick from your directory for: <b style={{color:"#1A1A1A"}}>{allTasks.find(t=>t.id===assignFor)?.label}</b>
          </div>
          {(directory||[]).length===0?(
            <div style={{fontSize:12,color:"#9A9A9A",padding:"10px 0"}}>Your directory is empty. Switch to the <b>Directory</b> tab and add subcontractors first.</div>
          ):(
            <div style={{maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
              {tradeOrder.map(trade=>(
                <div key={trade}>
                  <div style={{fontSize:9,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.07em",margin:"6px 0 3px"}}>{trade}</div>
                  {byTrade[trade].map(d=>(
                    <button key={d.id} onClick={()=>assignSub(assignFor,d.id)}
                      style={{display:"flex",alignItems:"center",gap:8,width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:7,border:"1px solid #E5E2DC",background:"#FFFFFF",cursor:"pointer",marginBottom:4}}>
                      <Icon name="hard" size={13}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:700}}>{d.company}</div>
                        {(d.contact||d.phone)&&<div style={{fontSize:10,color:"#6B6B6B"}}>{[d.contact,d.phone].filter(Boolean).join(" · ")}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
          {subs[assignFor]?.subId&&(
            <button onClick={()=>{const s=subs[assignFor];set("subs",assignFor,{...s,subId:""});setAssignFor(null);}}
              style={{marginTop:12,fontSize:11,color:"#DC2626",background:"none",border:"none",cursor:"pointer",padding:0}}>Clear assignment</button>
          )}
        </Modal>
      )}
    </div>
  );
}

// ── BUDGET ────────────────────────────────────────────────────────────────────
function Budget({project,upd,set,allTasks,totAlloc,totSpent}) {
  const over=project.totalBudget&&totSpent>num(project.totalBudget);
  return (
    <div>
      <h2 style={{margin:"0 0 16px",fontSize:18,fontWeight:700}}>Budget Tracker</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:11,marginBottom:18}}>
        {[{label:"Total Budget",value:fmt$(project.totalBudget),color:"#1A1A1A"},{label:"Allocated",value:fmt$(totAlloc),color:over?"#EF4444":"#4A7B6F"},{label:"Spent",value:fmt$(totSpent),color:"#F59E0B"},{label:"Remaining",value:project.totalBudget?fmt$(num(project.totalBudget)-totSpent):"—",color:num(project.totalBudget)-totSpent<0?"#EF4444":"#22C55E"}].map(s=>(
          <div key={s.label} style={{...S.card,padding:"12px 14px",border:`1px solid ${s.color}33`}}>
            <div style={{fontSize:10,color:"#6B6B6B",marginBottom:2}}>{s.label}</div>
            <div style={{fontSize:19,fontWeight:800,color:s.color}}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{...S.card,padding:"13px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>Project Total Budget</span>
        <div style={{position:"relative",flex:1,maxWidth:230}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#9A9A9A",fontSize:12}}>$</span>
          <input type="number" value={project.totalBudget||""} onChange={e=>upd(project.id,{totalBudget:e.target.value})} placeholder="Enter total budget"
            style={{width:"100%",background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:6,color:"#1A1A1A",padding:"6px 9px 6px 20px",fontSize:12,boxSizing:"border-box"}}/>
        </div>
      </div>

      {project.phases.map(phase=>{
        const pA=phase.tasks.reduce((s,t)=>s+num(project.budgets[t.id]?.allocated),0);
        const pS=phase.tasks.reduce((s,t)=>s+num(project.budgets[t.id]?.spent),0);
        if(!phase.tasks.length)return null;
        return (
          <div key={phase.id} style={{marginBottom:18}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:3,height:14,background:phase.color,borderRadius:2}}/>
                <span style={{fontSize:10,fontWeight:700,color:phase.color,textTransform:"uppercase",letterSpacing:"0.08em"}}>{phase.label}</span>
              </div>
              <span style={{fontSize:11,color:"#6B6B6B"}}>Alloc: <b style={{color:"#1A1A1A"}}>{fmt$(pA)}</b> · Spent: <b style={{color:"#F59E0B"}}>{fmt$(pS)}</b></span>
            </div>
            <div style={{...S.card,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 120px 120px 85px",padding:"6px 13px",borderBottom:"1px solid #E5E2DC",gap:8}}>
                {["Task","Allocated","Spent","Variance"].map(h=><div key={h} style={{fontSize:9,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase"}}>{h}</div>)}
              </div>
              {phase.tasks.map((task,ti)=>{
                const b=project.budgets[task.id]||{};
                const al=num(b.allocated),sp=num(b.spent),va=al-sp,ov=sp>al&&al>0;
                return (
                  <div key={task.id} style={{display:"grid",gridTemplateColumns:"1fr 120px 120px 85px",padding:"7px 13px",borderBottom:"1px solid #E5E2DC08",gap:8,alignItems:"center",background:ti%2===1?"#FFFFFF33":"transparent"}}>
                    <div style={{fontSize:11,display:"flex",alignItems:"center",gap:5}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:STATUS_COLORS[project.statuses[task.id]],flexShrink:0}}/>
                      {task.label}
                    </div>
                    {["allocated","spent"].map(k=>(
                      <div key={k} style={{position:"relative"}}>
                        <span style={{position:"absolute",left:6,top:"50%",transform:"translateY(-50%)",color:"#9A9A9A",fontSize:10,pointerEvents:"none"}}>$</span>
                        <input type="number" value={b[k]||""} placeholder="0" onChange={e=>set("budgets",task.id,{...b,[k]:e.target.value})}
                          style={{width:"100%",background:"#FFFFFF",border:"1px solid #E5E2DC",borderRadius:5,color:"#1A1A1A",padding:"3px 6px 3px 17px",fontSize:11,boxSizing:"border-box"}}/>
                      </div>
                    ))}
                    <div style={{fontSize:11,fontWeight:600,color:al===0?"#9A9A9A":ov?"#EF4444":"#22C55E"}}>{al===0?"—":(ov?"-":"+")+fmt$(Math.abs(va))}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── DOCUMENTS ─────────────────────────────────────────────────────────────────
function Docs({project,setFolders}) {
  // Seed default folders for older projects
  useEffect(()=>{ if(!project.docFolders){ setFolders(DEFAULT_FOLDERS.map(mkFolder)); } },[]);
  const root = project.docFolders || [];

  // path = array of folder ids; [] means root level
  const [path,setPath]=useState([]);
  const [newName,setNewName]=useState("");
  const [renaming,setRenaming]=useState(null);
  const [renameVal,setRenameVal]=useState("");
  const [moving,setMoving]=useState(null); // {kind:"file"|"folder", id, name}
  const fRef=useRef();

  // Current folder & its contents
  const current = path.length? treeGet(root,path) : null;
  const folders = current? (current.folders||[]) : root;
  const files = current? (current.files||[]) : [];

  // Breadcrumb labels
  const crumbs=[]; { let list=root; for(const id of path){ const f=(list||[]).find(x=>x.id===id); if(!f)break; crumbs.push(f); list=f.folders||[]; } }

  // count helper (recursive)
  const countAll=(f)=>{ let n=(f.files||[]).length; (f.folders||[]).forEach(c=>n+=countAll(c)); return n; };

  // ── mutations ──
  const writeRoot=(newRoot)=>setFolders(newRoot);
  const writeInCurrent=(mutateFolderArrayOrFiles)=>{
    if(path.length===0){ writeRoot(mutateFolderArrayOrFiles(root)); }
    else { writeRoot(treeUpdate(root,path,(f)=>mutateFolderArrayOrFiles(f))); }
  };

  const addFolder=()=>{
    if(!newName.trim())return;
    const nf=mkFolder(newName.trim());
    if(path.length===0) writeRoot([...root,nf]);
    else writeRoot(treeUpdate(root,path,f=>({...f,folders:[...(f.folders||[]),nf]})));
    setNewName("");
  };
  const delFolder=(fid)=>{
    if(!window.confirm("Delete this folder and everything inside it?"))return;
    if(path.length===0) writeRoot(root.filter(f=>f.id!==fid));
    else writeRoot(treeUpdate(root,path,f=>({...f,folders:(f.folders||[]).filter(c=>c.id!==fid)})));
  };
  const renameFolder=(fid)=>{
    if(!renameVal.trim()){setRenaming(null);return;}
    if(path.length===0) writeRoot(root.map(f=>f.id===fid?{...f,name:renameVal.trim()}:f));
    else writeRoot(treeUpdate(root,path,f=>({...f,folders:(f.folders||[]).map(c=>c.id===fid?{...c,name:renameVal.trim()}:c)})));
    setRenaming(null);
  };

  const readFiles=(fileList)=>{
    Array.from(fileList).forEach(file=>{
      const r=new FileReader();
      r.onload=ev=>{
        const doc={id:uid(),name:file.name.replace(/\.[^.]+$/,""),fileName:file.name,type:file.type,size:file.size,data:ev.target.result,uploadedAt:new Date().toLocaleDateString()};
        setFolders(prev=> path.length===0
          ? prev // can't add files at root
          : treeUpdate(prev,path,f=>({...f,files:[...(f.files||[]),doc]})) );
      };
      r.readAsDataURL(file);
    });
  };
  const handleFiles=e=>{readFiles(e.target.files);e.target.value="";};
  const onDrop=e=>{e.preventDefault();e.currentTarget.style.borderColor="#D6D2CA";if(path.length>0)readFiles(e.dataTransfer.files);};
  const renameFile=(fileId,name)=>writeRoot(treeUpdate(root,path,f=>({...f,files:(f.files||[]).map(d=>d.id===fileId?{...d,name}:d)})));
  const delFile=(fileId)=>writeRoot(treeUpdate(root,path,f=>({...f,files:(f.files||[]).filter(d=>d.id!==fileId)})));

  // ── MOVE ──
  // Remove a file from current path; returns [newRoot, removedFile]
  const removeFileFromCurrent=(rootArr,fileId)=>{
    let removed=null;
    const apply=(arr,p)=> arr.map(f=>{
      if(p.length===1 && f.id===p[0]){
        const keep=(f.files||[]).filter(d=>{if(d.id===fileId){removed=d;return false;}return true;});
        return {...f,files:keep};
      }
      if(p.length>1 && f.id===p[0]) return {...f,folders:apply(f.folders||[],p.slice(1))};
      return f;
    });
    const nr=apply(rootArr,path);
    return [nr,removed];
  };
  const insertFileAt=(rootArr,destPath,file)=>{
    if(destPath.length===0) return rootArr; // can't drop file at root
    return treeUpdate(rootArr,destPath,f=>({...f,files:[...(f.files||[]),file]}));
  };
  // Remove a folder by its id from anywhere; returns [newRoot, removedFolder]
  const removeFolder=(arr,fid)=>{
    let removed=null;
    const filtered=[];
    for(const f of arr){
      if(f.id===fid){removed=f;continue;}
      const [childArr,childRemoved]=removeFolder(f.folders||[],fid);
      if(childRemoved){removed=childRemoved;filtered.push({...f,folders:childArr});}
      else filtered.push(f);
    }
    return [filtered,removed];
  };
  const insertFolderAt=(arr,destPath,folder)=>{
    if(destPath.length===0) return [...arr,folder];
    return treeUpdate(arr,destPath,f=>({...f,folders:[...(f.folders||[]),folder]}));
  };

  const doMove=(destPath)=>{
    if(moving.kind==="file"){
      const [nr,file]=removeFileFromCurrent(root,moving.id);
      if(file) writeRoot(insertFileAt(nr,destPath,file));
    } else {
      const [nr,folder]=removeFolder(root,moving.id);
      if(folder) writeRoot(insertFolderAt(nr,destPath,folder));
    }
    setMoving(null);
  };

  // Destinations for the move picker
  const allDests=flattenFolders(root);

  return (
    <div style={{height:"calc(100vh - 140px)",minHeight:400,display:"flex",flexDirection:"column",gap:12}}>
      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
        <Icon name="folder" size={16}/>
        <button onClick={()=>setPath([])} style={{background:"none",border:"none",color:path.length?"#6B6B6B":"#1A1A1A",fontWeight:path.length?500:800,fontSize:16,cursor:"pointer",padding:0}}>Documents</button>
        {crumbs.map((c,i)=>(
          <span key={c.id} style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{color:"#C8C4BC"}}>/</span>
            <button onClick={()=>setPath(path.slice(0,i+1))} style={{background:"none",border:"none",color:i===crumbs.length-1?"#1A1A1A":"#6B6B6B",fontWeight:i===crumbs.length-1?800:500,fontSize:16,cursor:"pointer",padding:0}}>{c.name}</button>
          </span>
        ))}
        {path.length>0 && <button onClick={()=>setPath(path.slice(0,-1))} style={{marginLeft:8,fontSize:11,color:"#6B6B6B",background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:6,padding:"3px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="up" size={11}/> Up</button>}
      </div>

      {/* Add subfolder + upload row */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:5}}>
          <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={path.length?"New subfolder…":"New folder…"} onKeyDown={e=>e.key==="Enter"&&addFolder()}
            style={{background:"#FFFFFF",border:"1px solid #D6D2CA",borderRadius:6,color:"#1A1A1A",padding:"7px 10px",fontSize:12,width:170,boxSizing:"border-box"}}/>
          <button onClick={addFolder} style={{background:"#1A1A1A",border:"none",borderRadius:6,color:"#fff",padding:"0 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600}}><Icon name="plus" size={12}/> Folder</button>
        </div>
        {path.length>0 && (
          <button onClick={()=>fRef.current?.click()} style={{background:"#F2F0EC",border:"1px solid #D6D2CA",borderRadius:6,color:"#3A3A3A",padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600}}>
            <Icon name="upload" size={12}/> Upload Files Here
          </button>
        )}
        <input type="file" ref={fRef} style={{display:"none"}} multiple accept="image/*,.pdf,.doc,.docx,.xlsx,.txt" onChange={handleFiles}/>
      </div>

      {/* Drop zone (only inside a folder) */}
      {path.length>0 && (
        <div style={{...S.card,padding:"12px",textAlign:"center",cursor:"pointer",border:"2px dashed #D6D2CA"}}
          onClick={()=>fRef.current?.click()}
          onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor="#1A1A1A";}}
          onDragLeave={e=>{e.currentTarget.style.borderColor="#D6D2CA";}}
          onDrop={onDrop}>
          <div style={{fontSize:11,color:"#9A9A9A"}}>Drag & drop files into "{crumbs[crumbs.length-1]?.name}" — or use the buttons above</div>
        </div>
      )}

      {/* Contents */}
      <div style={{flex:1,overflowY:"auto"}}>
        {folders.length===0 && files.length===0 && (
          <div style={{textAlign:"center",padding:50,color:"#9A9A9A",fontSize:13}}>
            {path.length===0?"No folders yet. Create one like \"Surveys\" above.":"This folder is empty. Add a subfolder or upload files."}
          </div>
        )}

        {/* Subfolders grid */}
        {folders.length>0 && (
          <>
            <div style={{fontSize:10,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Folders</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:20}}>
              {folders.map(f=>{
                const n=countAll(f); const subs=(f.folders||[]).length;
                return (
                  <div key={f.id} style={{...S.card,padding:"12px 14px",position:"relative"}}>
                    {renaming===f.id?(
                      <div style={{display:"flex",gap:4}}>
                        <input autoFocus value={renameVal} onChange={e=>setRenameVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&renameFolder(f.id)}
                          style={{flex:1,background:"#FFFFFF",border:"1px solid #1A1A1A",borderRadius:5,padding:"4px 7px",fontSize:12,minWidth:0,boxSizing:"border-box"}}/>
                        <button onClick={()=>renameFolder(f.id)} style={{background:"#1A1A1A",border:"none",borderRadius:5,color:"#fff",padding:"0 8px",cursor:"pointer"}}>✓</button>
                      </div>
                    ):(
                      <>
                        <div onClick={()=>setPath([...path,f.id])} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}}>
                          <Icon name="folder" size={20}/>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:13,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</div>
                            <div style={{fontSize:10,color:"#9A9A9A",marginTop:1}}>{n} file{n!==1?"s":""}{subs?` · ${subs} subfolder${subs!==1?"s":""}`:""}</div>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:8,marginTop:9}}>
                          <button onClick={()=>{setRenaming(f.id);setRenameVal(f.name);}} style={{fontSize:10,color:"#9A9A9A",background:"none",border:"none",cursor:"pointer",padding:0}}>Rename</button>
                          <button onClick={()=>setMoving({kind:"folder",id:f.id,name:f.name})} style={{fontSize:10,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",padding:0}}>Move</button>
                          <button onClick={()=>delFolder(f.id)} style={{fontSize:10,color:"#DC2626",background:"none",border:"none",cursor:"pointer",padding:0}}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Files grid */}
        {files.length>0 && (
          <>
            <div style={{fontSize:10,fontWeight:700,color:"#9A9A9A",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Files</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:11}}>
              {files.map(doc=>(
                <div key={doc.id} style={{...S.card,overflow:"hidden",position:"relative",display:"flex",flexDirection:"column"}}>
                  {doc.type?.startsWith("image/")?
                    <a href={doc.data} download={doc.fileName} title="Download"><img src={doc.data} alt={doc.name} style={{width:"100%",height:100,objectFit:"cover",display:"block"}}/></a>:
                    <a href={doc.data} download={doc.fileName} title="Download" style={{height:100,display:"flex",alignItems:"center",justifyContent:"center",background:"#F7F6F3",color:"#4A7B6F"}}><Icon name="file" size={32}/></a>}
                  <div style={{padding:"7px 9px",flex:1}}>
                    <input value={doc.name} onChange={e=>renameFile(doc.id,e.target.value)}
                      style={{width:"100%",fontSize:11,fontWeight:600,color:"#1A1A1A",background:"transparent",border:"1px solid transparent",borderRadius:4,padding:"2px 4px",boxSizing:"border-box"}}
                      onFocus={e=>e.target.style.border="1px solid #D6D2CA"} onBlur={e=>e.target.style.border="1px solid transparent"}/>
                    <div style={{fontSize:9,color:"#9A9A9A",marginTop:2,padding:"0 4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={doc.fileName}>{doc.fileName}</div>
                    <div style={{fontSize:9,color:"#B8B4AC",padding:"0 4px",marginTop:1}}>{(doc.size/1024).toFixed(0)} KB · {doc.uploadedAt}</div>
                    <button onClick={()=>setMoving({kind:"file",id:doc.id,name:doc.name})} style={{fontSize:10,color:"#6B6B6B",background:"none",border:"none",cursor:"pointer",padding:"3px 4px 0",fontWeight:600}}>Move to…</button>
                  </div>
                  <button onClick={()=>delFile(doc.id)} style={{position:"absolute",top:5,right:5,background:"#00000099",border:"none",borderRadius:"50%",width:19,height:19,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><Icon name="x" size={10}/></button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MOVE MODAL */}
      {moving&&(
        <Modal title={`Move ${moving.kind==="file"?"File":"Folder"}: ${moving.name}`} onClose={()=>setMoving(null)} width={400}>
          <div style={{fontSize:11,color:"#6B6B6B",marginBottom:12}}>Choose a destination folder:</div>
          <div style={{maxHeight:300,overflowY:"auto",border:"1px solid #E5E2DC",borderRadius:8,padding:6}}>
            {moving.kind==="file"&&(
              <div style={{fontSize:11,color:"#9A9A9A",padding:"6px 8px"}}>Files must go inside a folder.</div>
            )}
            {moving.kind==="folder"&&(
              <button onClick={()=>doMove([])} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 9px",borderRadius:6,border:"none",background:"transparent",cursor:"pointer",fontSize:12,fontWeight:700,color:"#1A1A1A"}}>
                📁 Documents (top level)
              </button>
            )}
            {allDests.map(d=>{
              // Disallow moving a folder into itself or its own descendants
              const blocked = moving.kind==="folder" && pathContains(d.path, moving.id);
              return (
                <button key={d.id} disabled={blocked} onClick={()=>!blocked&&doMove(d.path)}
                  style={{display:"block",width:"100%",textAlign:"left",padding:"7px 9px",paddingLeft:9+d.depth*16,borderRadius:6,border:"none",background:"transparent",cursor:blocked?"not-allowed":"pointer",fontSize:12,color:blocked?"#C8C4BC":"#3A3A3A"}}>
                  <Icon name="folder" size={11}/> {d.name}{blocked?"  (can't move into itself)":""}
                </button>
              );
            })}
          </div>
          <div style={{marginTop:14}}><Btn onClick={()=>setMoving(null)}>Cancel</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ── GANTT ─────────────────────────────────────────────────────────────────────
function GanttView({project,sched,totalDays}) {
  const LW=185,DW=Math.max(6,Math.min(14,Math.floor((860-185)/Math.max(totalDays,1))));
  const todayD=Math.round((new Date()-new Date(project.start+"T00:00:00"))/86400000);
  const months=[];let cur=new Date(project.start+"T00:00:00");
  for(let d=0;d<=totalDays;){
    const lbl=cur.toLocaleDateString("en-US",{month:"short",year:"2-digit"});
    const rem=new Date(cur.getFullYear(),cur.getMonth()+1,1)-cur;
    const span=Math.min(Math.ceil(rem/86400000),totalDays-d);
    if(span<=0)break;months.push({lbl,span});d+=span;cur=new Date(cur.getTime()+span*86400000);
  }
  return (
    <div>
      <h2 style={{margin:"0 0 14px",fontSize:18,fontWeight:700}}>Gantt Schedule</h2>
      <div style={{overflowX:"auto",...S.card}}>
        <div style={{minWidth:LW+totalDays*DW}}>
          <div style={{display:"flex",borderBottom:"1px solid #E5E2DC"}}>
            <div style={{width:LW,flexShrink:0,padding:"6px 12px",fontSize:10,color:"#9A9A9A"}}>Task</div>
            <div style={{flex:1,display:"flex"}}>
              {months.map((m,i)=><div key={i} style={{width:m.span*DW,flexShrink:0,padding:"6px 4px",fontSize:9,color:"#9A9A9A",borderLeft:"1px solid #E5E2DC",overflow:"hidden",whiteSpace:"nowrap"}}>{m.lbl}</div>)}
            </div>
          </div>
          {project.phases.map(ph=>(
            <div key={ph.id}>
              <div style={{display:"flex",background:"#FFFFFF",borderBottom:"1px solid #E5E2DC"}}>
                <div style={{width:LW,flexShrink:0,padding:"4px 12px",fontSize:9,fontWeight:700,color:ph.color,textTransform:"uppercase",letterSpacing:"0.07em"}}>{ph.label}</div>
                <div style={{flex:1,position:"relative",height:22}}>
                  {todayD>=0&&todayD<=totalDays&&<div style={{position:"absolute",inset:0,left:todayD*DW,width:1,background:"#1A1A1A55"}}/>}
                </div>
              </div>
              {ph.tasks.map(task=>{
                const s=sched[task.id];if(!s)return null;
                const sc=STATUS_COLORS[project.statuses[task.id]];
                return (
                  <div key={task.id} style={{display:"flex",borderBottom:"1px solid #E5E2DC08",minHeight:30}}>
                    <div style={{width:LW,flexShrink:0,padding:"5px 12px",fontSize:10,color:"#6B6B6B",display:"flex",alignItems:"center",gap:5}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:sc,flexShrink:0}}/>
                      <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{task.label}</span>
                    </div>
                    <div style={{flex:1,position:"relative"}}>
                      {todayD>=0&&todayD<=totalDays&&<div style={{position:"absolute",inset:0,left:todayD*DW,width:1,background:"#1A1A1A44"}}/>}
                      <div style={{position:"absolute",top:5,left:s.startDay*DW,width:(s.endDay-s.startDay)*DW,height:18,background:sc+"33",border:`1px solid ${sc}`,borderRadius:3,display:"flex",alignItems:"center",paddingLeft:3,overflow:"hidden"}}>
                        <span style={{fontSize:8,color:sc,whiteSpace:"nowrap"}}>{task.duration}d</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {todayD>=0&&todayD<=totalDays&&<div style={{position:"relative",height:14}}><div style={{position:"absolute",left:LW+todayD*DW-14,fontSize:8,color:"#1A1A1A",fontWeight:700,background:"#FFFFFF",padding:"1px 3px",borderRadius:2}}>TODAY</div></div>}
        </div>
      </div>
      <div style={{display:"flex",gap:12,marginTop:10,flexWrap:"wrap"}}>
        {STATUS_OPTIONS.map(s=><div key={s} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#6B6B6B"}}><div style={{width:10,height:10,background:STATUS_COLORS[s]+"44",border:`1px solid ${STATUS_COLORS[s]}`,borderRadius:2}}/>{s}</div>)}
      </div>
    </div>
  );
}

// ── CALENDAR ──────────────────────────────────────────────────────────────────
function CalView({project,sched}) {
  const [cur,setCur]=useState(()=>{const d=new Date(project.start+"T00:00:00");return{y:d.getFullYear(),m:d.getMonth()};});
  const {y,m}=cur;
  const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
  const allT=project.phases.flatMap(p=>p.tasks.map(t=>({...t,pc:p.color})));
  const byDay={};
  allT.forEach(task=>{
    const s=sched[task.id];if(!s)return;
    const sd=new Date(project.start+"T00:00:00");sd.setDate(sd.getDate()+s.startDay);
    const ed=new Date(project.start+"T00:00:00");ed.setDate(ed.getDate()+s.endDay);
    for(let d=new Date(sd);d<=ed;d.setDate(d.getDate()+1)){
      if(d.getFullYear()===y&&d.getMonth()===m){
        const day=d.getDate();
        if(!byDay[day])byDay[day]=[];
        if(!byDay[day].find(t=>t.id===task.id))byDay[day].push({...task,isStart:d.getDate()===sd.getDate()&&d.getMonth()===sd.getMonth()});
      }
    }
  });
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <h2 style={{margin:0,fontSize:18,fontWeight:700}}>Calendar</h2>
        <div style={{display:"flex",alignItems:"center",gap:7,marginLeft:"auto"}}>
          <button onClick={()=>setCur(c=>{const d=new Date(c.y,c.m-1);return{y:d.getFullYear(),m:d.getMonth()}})} style={{...S.card,border:"1px solid #E5E2DC",color:"#6B6B6B",padding:"4px 8px",cursor:"pointer"}}>◀</button>
          <span style={{fontSize:13,fontWeight:600,minWidth:140,textAlign:"center"}}>{new Date(y,m).toLocaleDateString("en-US",{month:"long",year:"numeric"})}</span>
          <button onClick={()=>setCur(c=>{const d=new Date(c.y,c.m+1);return{y:d.getFullYear(),m:d.getMonth()}})} style={{...S.card,border:"1px solid #E5E2DC",color:"#6B6B6B",padding:"4px 8px",cursor:"pointer"}}>▶</button>
        </div>
      </div>
      <div style={{...S.card,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid #E5E2DC"}}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} style={{padding:"7px 0",textAlign:"center",fontSize:9,color:"#9A9A9A",fontWeight:700,letterSpacing:"0.05em"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
          {Array(first).fill(null).map((_,i)=><div key={`e${i}`} style={{minHeight:72,borderRight:"1px solid #E5E2DC11",borderBottom:"1px solid #E5E2DC11"}}/>)}
          {Array(days).fill(null).map((_,i)=>{
            const day=i+1,ts=byDay[day]||[];
            const isT=new Date().getDate()===day&&new Date().getMonth()===m&&new Date().getFullYear()===y;
            return <div key={day} style={{minHeight:72,padding:"4px 5px",borderRight:"1px solid #E5E2DC22",borderBottom:"1px solid #E5E2DC22",background:isT?"#1A1A1A11":"transparent"}}>
              <div style={{fontSize:10,fontWeight:isT?700:400,color:isT?"#1A1A1A":"#6B6B6B",marginBottom:2}}>{day}</div>
              {ts.slice(0,3).map(t=><div key={t.id} style={{fontSize:8,background:t.pc+"33",border:`1px solid ${t.pc}55`,borderRadius:2,padding:"1px 3px",marginBottom:2,color:t.pc,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={t.label}>{t.isStart?"▶ ":""}{t.label}</div>)}
              {ts.length>3&&<div style={{fontSize:8,color:"#9A9A9A"}}>+{ts.length-3}</div>}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
